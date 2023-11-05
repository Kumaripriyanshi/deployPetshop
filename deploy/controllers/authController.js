import userModel from "../models/userModel.js";
import { hashPassword, comparePassword } from "../helpers/authHelpers.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    if (!name) return res.send({ error: "Name is required" });
    if (!email) return res.send({ error: "Email is required" });
    if (!password) return res.send({ error: "Password is required" });
    if (!phone) return res.send({ error: "Phone is required" });
    if (!address) return res.send({ error: "Address is required" });
    // if (!answer) return res.send({ error: "Answer is required" });

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already registered",
      });
    }

    const hashedPassword = await hashPassword(password);
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
   
    }).save();

    res.status(201).send({
      success: true,
      message: "User register successfully",
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in registeration ",
      err,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user)
      return res.status(404).send({
        success: false,
        message: "User doesn't exists",
      });

    const matchpwd = comparePassword(password, user.password);
    if (!matchpwd)
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });

    const token = await JWT.sign(
      { _id: user._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).send({
      success: true,
      message: "Successfully Logined",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone:user.phone,
        address:user.address,
        role:user.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error in Login",
      success: false,
      error,
    });
  }
};

export const testController = async (req, res) => {
  try {
    console.log(req.user, "now admin", req.admin);
  } catch (err) {
    console.log(err);
  }
};



export const updateCredentials = async (req, res) => {
  try {
    

    const { name, email, phone, address } = req.body;
    const {id}=req.params
    let updObj={}
    if(name)updObj.name=name
    if(email) updObj.email=email
    if(phone) updObj.phone =phone
    if(address) updObj.address=address
    const user = await userModel.findByIdAndUpdate(id,updObj,{new:true}).select("-password")

    // await user.update({new:true}).save()
    const token = await JWT.sign(
      { _id: id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );
    res.status(200).send({
      success:true,
      user,
      token
    })

  } catch (err) {
    console.log(err);
  }
};