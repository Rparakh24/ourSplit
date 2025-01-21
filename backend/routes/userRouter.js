const express = require('express');
const router = express.Router();
const zod = require('zod');
const { User, Group } = require('../db');
const jwt = require('jsonwebtoken');
const JWT_secret = require('../config');
const{ userAuth } = require("../middleware/userAuth");

const schema = zod.object({
    username: zod.string(),
    fname: zod.string(),
    lname: zod.string(),
    pswd: zod.string()
})

router.post('/signup',async(req,res)=>{
    const {username,fname,lname,pswd} = req.body;
    const validate = schema.safeParse({
        username, fname, lname, pswd 
    })
    const exist = await User.findOne({
        username
    })
    if(exist || !validate.success){
        return res.status(400).json("Account already exists or invalid username passoword")
    }
    const newUser = await User.create({
        username, fname, lname, pswd 
    })
    const userId = newUser._id;
    const token = jwt.sign({userId},JWT_secret);
    res.status(200).json({token:token, msg:"User created sucessfully"});

})
router.post("/signin",async(req,res)=>{
    const{username,pswd} = req.body;
    const check = await User.findOne({username});
    if(check){
        return res.status(200).json({msg:true});
    }
    else{
        res.status(400).json({msg:false});
    }
})
router.get("/all",userAuth,async(req,res)=>{
    const filter = req.query.filter || "";
    console.log(filter);
    const users = await User.find(
        {
            $or:[{
                    fname:{
                        "$regex":filter, "$options":"i"
                        }
                }
                ,{
                    lname:{
                        "$regex":filter, "$options":"i"
                        }   
            }
            ]
        },
    )
    const filteredusers = users.filter((u) => u._id.toString() != req.userId);

  res.json({ user: filteredusers });
})
router.get("/getUser",userAuth,async(req,res)=>{
    const groupId = req.query.id;
    const group = await Group.findById(groupId);
    const members = group.members;
    async function getUsers(mem){
        const user = await User.findById(mem.userId);
        return {userId:user._id.toString(),name:user.fname+""+user.lname};
    }
    let member = await Promise.all(group.members.map(getUsers));
    // console.log(member);
    res.json({member:member});
})
module.exports = router;