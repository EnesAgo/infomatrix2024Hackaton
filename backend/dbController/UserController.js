const { v4: uuidv4 } = require('uuid');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const MongooseSchemas = require("./SchemaControllers")
const User = MongooseSchemas.UserSchema

async function createUser(data){
    try{

        //checkUserName
        const oldUserUsername = await User.findOne({
            username: data.username
        })

        if(oldUserUsername || oldUserUsername != null){
            return {error: 'username found'};
        }


        //checkUserEmail
        const oldUserEmail = await User.findOne({
            email: data.email
        })

        if(oldUserEmail || oldUserEmail != null){
            return {error: 'user email found'};
        }



        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(data.password, salt)
        const uuIDString = uuidv4();

        const hashedData = {
            username: data.username,
            name: data.name,
            surname: data.surname,
            email: data.email,

            password: hashedPassword,
            uuID: uuIDString,
        }

        const user = await User.create(hashedData)

        const token = jwt.sign({uuID: data.uuID}, process.env.JWT_SECRET)

        const dataUser = {
            username: user.username,
            name: user.name,

            uuID: user.uuID,

            token: token
        }


        return dataUser

    }catch (e){
        return {error: e}
    }
}
async function loginUser(data){
    try{

        const user = await User.findOne({
            username: data.username
        })

        if(!user || user == null){
            return {error: 'user not found'};
        }

        const validPass = await bcrypt.compare(data.password, user.password);
        if(!validPass) return {error: 'user password incorrect'}


        const token = jwt.sign({uuID: user.uuID}, process.env.JWT_SECRET)

        const dataUser = {
            username: user.username,
            name: user.name,

            uuID: user.uuID,

            token: token
        }

        return dataUser;

    }catch (e){
        return {error: e}
    }
}

async function getAllUsers(page){
    try{

        // define limit per page
        const limit = 25;
        const offset = (page - 1) * limit;


        const total = await User.countDocuments({});

        const Users = await User.find({}).skip(offset).limit(limit);

        const dataUsers = Users.map(e => {
            return {
                username: e.username,
                name: e.name,

                uuID: e.uuID,

                token: e.token
            }
        })


        console.log(dataUsers)

        return { total, dataUsers, page }

    }catch (e){
        return {error: e}
    }
}


async function getOneUser(uuID){
    try{

        // define limit per page
        const user = await User.find({uuID: uuID});

        if(!user || user === null) return {error: "user not found"}

        const dataUser = {
            username: user.username,
            email: user.email,

            uuID: user.uuID,
            token: e.token
        }



        console.log(dataUser)

        return dataUser

    }catch (e){
        return {error: e}
    }
}

async function ChangeUserPassword(uuID, oldPass, newPass){
    try{

        const user = await User.findOne({
            uuID: uuID
        })

        if(!user || user == null){
            return {error: 'user not found'};
        }

        const validPass = await bcrypt.compare(oldPass, user.password);
        if(!validPass) return {error: 'user password incorrect'}


        const salt = await bcrypt.genSalt(10)
        const newHashedPassword = await bcrypt.hash(newPass, salt)

        const updated = await User.findOneAndUpdate(
            {uuID: uuID},
            {password: newHashedPassword}
        )

        console.log(updated)

        return {success: "password successfully changed"}

    }catch (e){
        return {error: e}
    }
}


module.exports = {
    createUser: createUser,
    loginUser: loginUser,
    getAllUsers: getAllUsers,
    getOneUser: getOneUser,
    ChangeUserPassword: ChangeUserPassword,
};