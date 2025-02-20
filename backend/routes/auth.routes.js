import express from 'express';
import { login, logout, signup } from "../controllers/auth.controller.js";

const router =express.Router();

router.post('/signup',signup);
router.post('/login',login);
router.post('/logout',logout);

export default router;










//  now let say this function inside routes (req,res) is like 50-60 lines of code 
// so if i put all these function code in this single file this will be too much complicated and will be hard to understand
// so we put these function in a seprate function folder that is called 
//  controllers
//  so there we write this code because they are basically controller in the project
// router.get('/logout',(req,res)=>{
//     res.send("logout route")
// })
