import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";


const router = express.Router();
//  here protect route is middleware that full run before sendMessage , this is authorization
router.get('/:id', protectRoute, getMessages);
router.post('/send/:id', protectRoute, sendMessage);


export default router;