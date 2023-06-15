const express=require('express')
const { connection } = require('./db')
const { blogRouter } = require('./Routes/blog.routes')
const {userRouter} = require('./Routes/user.routes')
const {Auth} = require('./Middleware/auth.middleware')
const cors=require('cors')
require('dotenv').config()

const app=express()

app.use(cors())
app.use(express.json())

app.get('/', (req,res)=>{
    res.status(200).send("Welcome To Homepage")
})

app.use(userRouter)
app.use(Auth)
app.use('/blogs', blogRouter)


app.listen(process.env.port, async()=>{
      try{
        await connection
        console.log('Connected to DB');
      }catch(err){
        console.log(err);
        console.log("Something went wrong");
      }
       console.log(`Server is running on port ${process.env.port}`);
})