const express = require('express');
const { registerUser,loginUser } = require('../controller/userController');
const router = express.Router();


router.route('/signup').post(registerUser);
router.route('/login',function(req,res){
    res.send("hello")
})

module.exports = router;