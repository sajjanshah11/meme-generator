const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../utility/generateToken') 


const registerUser = asyncHandler(async(req,res) => {
    const {name , email , password } = req.body;

    const userExists = await User.findOne({ email });

    if(userExists){
        // res.status(400);
        // throw new Error("User Already exists")

        res.json({status:'exists',user:false,message:"user already exists"})
    }

     const user = await User.create({
        name,
        email,
        password,
    });

    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id),
            status:"success"
        })
    } else {
        res.status(500).json({status:'error',user:false,message:"error occured"})
    }
})

const loginUser = asyncHandler(async(req,res) => {
    const {email , password } = req.body;

    const user = await User.findOne({ email });

    if(user && (await user.matchPassword(password))) {
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id),
            status:"success"
        })
    }else {
        // res.status(201)
        // throw new Error("Invalid Email and password!")
        res.json({status:'error',user:false,message:"Invalid Email and Password"})
    }
   
})

module.exports = {registerUser , loginUser}