const express=require('express')
const jwt=require('jsonwebtoken')
const { BlogModel } = require('../Model/blog.model')
const blogRouter=express.Router()

blogRouter.get('/', async (req,res)=>{
    let title=req.query.title 
    let category=req.query.category
    let order=req.query.order
    try{
            if(title){
                const blog=await BlogModel.find({titlle:title})
                res.status(200).send(blog)
            }else if(category){
                const blog=await BlogModel.find({category:category})
                res.status(200).send(blog)
            }else if(order){
                const blog= await BlogModel.find({date:1})
                res.status(200).send(blog)
            }else{
                const blog=await BlogModel.find()
                res.status(200).send(blog)
            }
           
        
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})

blogRouter.post('/', async (req,res)=>{
    try{
        let blog=new BlogModel(req.body)
        await blog.save()
        res.status(200).send({"msg":"New blog added"})
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})

blogRouter.patch('/:id', async (req,res)=>{
    const payload=req.body
    const id=req.params.id
    const blog=await BlogModel.findOne({"_id":id})
    const idInblog=blog.userID
    const id_requesting=req.body.userID
    try{
      if(id_requesting!==idInblog){
        res.status(400).send({"msg":"You are not authorized"})
      }else{
        await BlogModel.findByIdAndUpdate({'_id':id}, payload)
        res.status(200).send({'msg':'Updated the blog'})
      }
    }catch(err){
        console.log(err);
        res.status(400).send({'msg':'Something went wrong'})
    }
})

blogRouter.delete('/:id', async (req,res)=>{
    const id=req.params.id
    const blog=await BlogModel.findOne({"_id":id})
    const idInblog=blog.userID
    const id_requesting=req.body.userID
    try{
      if(id_requesting!==idInblog){
        res.status(400).send({"msg":"You are not authorized"})
      }else{
        await BlogModel.findByIdAndDelete({'_id':id})
        res.status(200).send({'msg':'Deleted the blog'})
      }
    }catch(err){
        console.log(err);
        res.status(400).send({'msg':'Something went wrong'})
    }
})

module.exports={blogRouter}