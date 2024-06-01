const mongoose = require("mongoose");

require("dotenv").config()
mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGODB_URI, () => {
    console.log("connected");
},e => {
    console.log(e)
})


const UserSchema = new mongoose.Schema({
    username: String,
    email: String,

    password: String,
    uuID: String,
})

const UserGPTPromptSchema = new mongoose.Schema({
    prompt: String,
    answer: String,
    uuID: String,
})

module.exports = {
    UserSchema: mongoose.model("User", UserSchema),
    GPTPrompt: mongoose.model("GPTPrompt", UserGPTPromptSchema)
}