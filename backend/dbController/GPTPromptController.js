const MongooseSchemas = require("./SchemaControllers")
const bcrypt = require("bcrypt");


const GPTPrompt = MongooseSchemas.GPTPrompt

async function createGPTPrompt(data){
    try{
        const promptData = {
            prompt: data.prompt,
            answer: data.answer,
            uuID: data.uuID
        }

        const GPTPromptRet = await GPTPrompt.create(promptData)

        return GPTPromptRet

    }catch (e){
        return {error: e}
    }
}

async function getUserGPTPrompts(uuID){
    try{

        const History = await GPTPrompt.find({uuID: uuID});

        if(!History || History === null) return {error: "No History"}

        return History

    }catch (e){
        return {error: e}
    }
}

module.exports = {
    createGPTPrompt: createGPTPrompt,
    getUserGPTPrompts: getUserGPTPrompts,
};