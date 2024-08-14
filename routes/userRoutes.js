const express=require('express')
const bcrypt=require('bcrypt')
const UserModel=require('../models/UserSchema')


const userRouter=express()


userRouter.post('/signup',async(req,res)=>{
    let {name,email,password,gender}=req.body;
    try{
        await bcrypt.genSalt(10).then(salt =>{
            return bcrypt.hash(password,salt)
        }).then(hash=>{
            password = hash;
            console.log("Hash :", hash)
        }).catch(err=>{
            console.error(err)
        })


       
        const userData= new UserModel({name,email,password,gender});
        await userData.save();


        res.status(201).send(userData)
    } catch(e){
        res.status(500).send(e)
    }
})


userRouter.post('/login',async(req,res)=>{
    let {email,password}=req.body;
    try{
        let logindata=await UserModel.findOne({email:{$eq:email}});


        await bcrypt.compare(password,logindata.password,(err, result)=>{
            console.log(result);
            if(err){
                console.error("Error Comparing passwords: ",err);
            }
            if(result){
                res.status(200).send(logindata)
            }
            else
                res.send("Check Your credentials")
        })
    } catch(e){
        res.status(500).send(e)
    }
})


module.exports = userRouter
