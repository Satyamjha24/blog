const mongoose=require('mongoose')

const userSchema=mongoose.Schema({

    username :String,
    email :String,
    avatar :String,
    password :String,
})

const UserModel=mongoose.model('user', userSchema)

module.exports={UserModel}