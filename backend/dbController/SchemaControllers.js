const mongoose = require("mongoose");

require("dotenv").config()
mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGODB_URI, () => {
    console.log("connected");
},e => {
    console.log(e)
})


const ExampleSchema = new mongoose.Schema({
    example: String
})


module.exports = {
    EventSchema: mongoose.model("Example", ExampleSchema)
}