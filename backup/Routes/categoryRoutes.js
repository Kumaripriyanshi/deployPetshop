import express from "express";
import { isAdmin, isSignedin } from "../middlewares/authmiddlewares.js";
import { createCategory, updateCategory,deleteCategory,getAllCategories } from "../controllers/categoryController.js";

const router = express.Router();

router.post("/createCategory", isSignedin,isAdmin,createCategory);
router.put("/updateCategory/:id", isSignedin,isAdmin,updateCategory);
router.delete("/deleteCategory/:id", isSignedin,isAdmin,deleteCategory);
router.get("/getAllCategories",getAllCategories);






export default router;
