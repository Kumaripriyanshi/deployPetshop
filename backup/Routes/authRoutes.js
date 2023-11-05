import express from 'express'
import { registerController ,loginController ,testController ,updateCredentials } from '../controllers/authController.js';
import {isAdmin,isSignedin} from "../middlewares/authmiddlewares.js"

const router = express.Router();

router.post("/register",registerController);
router.post("/login",loginController);
router.get("/test",isSignedin,isAdmin,testController);
router.put("/updateCredentials/:id",isSignedin,updateCredentials);

router.get("/user-auth-check",isSignedin,(req,res)=>{
    res.status(200).send({success:true})
})
// 
router.get("/admin-auth-check",isSignedin,isAdmin,(req,res)=>{
    res.status(200).send({success:true})
})
export default router;