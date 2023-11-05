import express from 'express'
import { addInCart } from '../controllers/cartController.js';


const router = express.Router();

router.post("/addInCart",addInCart);

export default router;