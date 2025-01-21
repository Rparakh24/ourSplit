const express = require('express');
const { userAuth } = require('../middleware/userAuth');
const { Group, User } = require('../db');
const router = express.Router();
const zod = require('zod');



router.post("/create",userAuth,async(req,res)=>{
    const body = req.body;
    const exist = await Group.findOne({
        name:body.name
    })
    if (exist) {
        return res.status(400).json({ msg: "Invalid Data" });
    }
    const groups = await Group.create({
        name:body.name,
        members:body.members
    });
    const userId  = req.userId;
    console.log("userId in group create is"+userId);
    groups.members.push({
        userId:userId,
        gets:[],
        owed:[]
    })
    groups.members.forEach((mem1)=>{
        groups.members.forEach((mem2)=>{
            if(mem1.userId!=mem2.userId){
                mem1.gets.push({
                    userId:mem2.userId,
                    amount:0
                })
                mem1.owed.push({
                    userId:mem2.userId,
                    amount:0
                })
            }
        })
    })
    await groups.save();
    const groupId = groups._id;
    res.status(200).json({groupId:groupId,userId:userId});
})
router.get("/all",userAuth,async(req,res)=>{
    const filter = req.query.filter || "";
    const groups = await Group.find(
        {
        $or:[{
            name:{
                "$regex":filter, "$options":"i"
            }
        }]
    })
    const filteredgroups = groups.filter((g) =>
        g.members.some((p) => p.userId == req.userId)
      );
    
      res.json({ groups: filteredgroups });
})
router.get("/mygroup",userAuth,async(req,res)=>{
    const groupId = req.query.id;
    const userId = req.userId;
    async function findUser(id){
        const userCurrent = await User.findOne({_id:id});
        return (`${userCurrent.fname} ${userCurrent.lname}`);
    }
    const username = await User.findById(userId);
    const userName = username.fname+""+username.lname; 
    const group = await Group.findOne({
        _id:groupId
    })
    const groupName = group.name;
    const user = group.members.find((u)=> u.userId.toString()===userId);
    const myOwedTransaction = await Promise.all(
        user.owed
            .filter((o) => o.amount > 0)
            .map(async (o) => {
                const name = await findUser(o.userId);
                return { name: name, amount: o.amount, userId : o.userId.toString() };
            })
    );
    const myGetsTransaction = await Promise.all(
        user.gets
            .filter((g) => g.amount > 0)
            .map(async (g) => {
                const name = await findUser(g.userId);
                return { name: name, amount: g.amount, userId: g.userId };
            })
    );
    console.log(myGetsTransaction);
    res.json({myId:userId,userName:userName,groupName:groupName,owed:myOwedTransaction,gets:myGetsTransaction});

})


module.exports = router;