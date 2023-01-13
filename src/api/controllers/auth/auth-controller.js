const userModel = require("./../../models/user.model");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { loginValidation } = require("../../validations/validations");
const jwt=require('jsonwebtoken')

const addNewUser = async (req, res) => {
  try {
    //   testing unique email:
    const emailExists = await userModel.findOne({ email: req.body.email });
    if (emailExists) {
      return res
        .status(500)
        .json({ success: false, message: "email Already Exists: " });
    }
    // Hash the pass
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashPassword;
    //   saving new user
    const newUser = new userModel(req.body);
    let savedUser = await newUser.save();
    res.status(201).send(newUser);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Adding User error: ", error_message:error?.message,Complete_error:error });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const userdata = await userModel.find();
    console.log("user data: ", userdata);
    res.status(200).send(userdata);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "users Not Found: ", error });
  }
};

const login = async (req, res) => {
    const {error}=loginValidation(req.body);
    console.log("what is in the error: ",error);
    if(error)return res.status(400).json({success:false,message:"validation failed",error:error})
    const user = await userModel.findOne({ userName: req.body.userName });
    if (user == null || user == undefined) {
        return res
        .status(500)
        .json({ success: false, message: "UserName is wrong: " });
    }
    const validPass=await bcrypt.compare(req.body.password,user.password)
    if(!validPass) return res.status(400).json({success:false,message:"Password is wrong"});
    // Create and assign a token
    const token=jwt.sign({_id:user._id,role:user.role},process.env.token_private, {expiresIn: '2m'})
    res.header('auth-token',token).json({token:token,userData:user});
};

module.exports = {
  addNewUser,
  login,
  getAllUsers
};
