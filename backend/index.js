const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const {verify} = require("jsonwebtoken");
const OpenAI = require("openai")
const generateQuestions = require("./functions/generateMathQuestion");


//User Func imports
const UserFunctions = require("./dbController/UserController")
const {
    createUser: createUser,
    loginUser: loginUser,
    getAllUsers: getAllUsers,
    getOneUser: getOneUser,
    ChangeUserPassword: ChangeUserPassword,
} = UserFunctions;

//Prompts Func imports
const PromptFunctions = require("./dbController/GPTPromptController")
const {
    createGPTPrompt: createGPTPrompt,
    getUserGPTPrompts: getUserGPTPrompts,
} = PromptFunctions;



require('dotenv').config()

const app = express();

const openai = new OpenAI({
    apiKey: process.env[process.env.OPENAI_API_KEY], // This is the default and can be omitted
});

async function askAIPrompt(query) {
    try{
        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: 'assistant', content: query }],
            model: 'gpt-3.5-turbo',
        });
        console.log(chatCompletion)
        return chatCompletion
    } catch (e){
        console.log(e)
        return {error: e}
    }

}

//cors
app.use(cors({
    origin: "*",
    methods: ["GET","POST","PUT","DELETE"]
}))

app.use(express.static('public'));
app.use(express.json({limit: '10000mb'}));





    //app
    app.get("/", (req, res) => {
        res.json("hello world")
    })



    //Users
    app.post("/createUser", async (req, res) => {
    
        const data = {
            username: req.body.username,
            email: req.body.email,
    
            password: req.body.password,
        }
    
        const User = await createUser(data)
    
        res.json(User)
    })
    app.post("/loginUser", async (req, res) => {
    
        const loginToken = await loginUser({
            username: req.body.username,
            password: req.body.password
        })
    
        res.header('authorization', loginToken.token).send(loginToken)
    })
    app.get("/getAllUsers", async (req, res) => {
        let page;
    
        if(req.query.page){
            page = parseInt(req.query.page);
        }
        else{
            page = 1;
        }
    
        const Items = await getAllUsers(page)
    
        res.json(Items)
    })
    app.get("/getOneUser", async (req, res) => {
    
        const UserUUID = req.query.userUUID;
    
        const User = await getOneUser(UserUUID)
    
        res.json(User)
    })
    app.put("/changeUserPassword",  async (req, res) => {
        const uuID = req.query.userUUID;
        const oldPass = req.body.oldPass;
        const newPass = req.body.newPass;
    
        const user = await ChangeUserPassword(uuID, oldPass, newPass)
    
        res.json(user)
    })


    // GPTPromptHistory
    app.post("/createGPTPromptHistory", async (req, res) => {
        const gptHisData = {
            uuID: req.body.uuID,
            prompt: req.body.userPrompt,
            answer: req.body.answer
        }
        const His = await createGPTPrompt(gptHisData)

        res.json(His)
    })
    app.get("/userGPTPromptHistory", async (req, res) => {
        const His = await getUserGPTPrompts(req.query.uuID)
        res.json(His)
    })



    //side functions
    app.get("/mathQuestion", (req, res) => {
        const mathQuestion = generateQuestions()

        res.json(mathQuestion)
    })
    app.post("/askGPTPrompt", async (req, res) => {
        const userPrompt = req.body.prompt
        const aiAns = await askAIPrompt(userPrompt)
        console.log(aiAns)
        res.json(aiAns)
    })





app.listen(process.env.PORT);