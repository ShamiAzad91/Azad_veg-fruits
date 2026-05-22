import express from "express";
import {register,login,updateProfile} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middleware/auth.js";

const router = express.Router();

router.post("/register",register);
router.post("/login",login);

//auth check

router.get("/auth-check",requireSignIn,(req,res)=>{
    res.json({ok:true})
})
//admin check
router.get("/admin-check",requireSignIn,isAdmin,(req,res)=>{
    res.json({ok:true})
})

//user profile
router.put("/myprofile",requireSignIn,updateProfile);

//testing
router.get("/secret",requireSignIn,(req,res)=>{
    res.json({secret:"this is my secret buddy",
        user_details :req.user
    })
})

//is Admin

router.get(`/manageShop`,requireSignIn,isAdmin,(req,res)=>{
    res.json({shop:"my shop",
        admin_details:{
          role:req.user.role,
          name:req.user.name,
          email:req.user.email

        }
    })
})

export  default router;