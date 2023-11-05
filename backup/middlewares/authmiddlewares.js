import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const isSignedin = async (req, res, next) => {
  try {
    const decode = JWT.verify(req.headers.auth, process.env.JWT_SECRET_KEY);

    req.user = decode;

    next();
  } catch (error) {
    console.log("error in signed user !!", error);
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = userModel.findById(req.user._id);

    if (user.role !== 1) {
      next();
    } else
      res.status(400).send({
        success: false,
        message: "Error in admin signin",
      });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error in admin signin",
    });
  }
};
