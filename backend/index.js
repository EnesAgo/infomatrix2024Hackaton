const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const {verify} = require("jsonwebtoken");


require('dotenv').config()

const app = express();


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



app.listen(process.env.PORT);