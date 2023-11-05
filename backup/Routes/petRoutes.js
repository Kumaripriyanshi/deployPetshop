import express from "express";
import { isAdmin, isSignedin } from "../middlewares/authmiddlewares.js";
import { addPets ,getAllPets,getpetphoto , updatepets, deletepets ,getpetsById ,searchByFilter, searchByCategoryFilter} from "../controllers/petsController.js";

import formidable from "express-formidable"

const router = express.Router();


router.post("/addpets", isSignedin,isAdmin,formidable(), addPets);
router.get("/getallpets", getAllPets);
router.get("/getpetsById/:id", getpetsById);
router.get("/getpetphoto/:id",getpetphoto);
router.put("/updatepets/:id",isSignedin,isAdmin,formidable(), updatepets);
router.delete("/deletepets/:id",deletepets);
router.get("/searchByFilter/:keywords",searchByFilter);
router.get("/searchByFilterCategory/:keywords",searchByCategoryFilter);









export default router;
