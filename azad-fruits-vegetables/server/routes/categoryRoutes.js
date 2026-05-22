import express from "express";
import {requireSignIn,isAdmin} from "../middleware/auth.js";

import {create,update,getAllCategory,getSingleCategory,remove} from "../controllers/categoryController.js";

const router = express.Router();

router.post("/create",requireSignIn,isAdmin,create);
router.put("/update/:id",requireSignIn,isAdmin,update);
router.get("/all",getAllCategory);
router.get("/single/:slug",getSingleCategory);

router.delete("/remove/:id",requireSignIn,isAdmin,remove);




export default router;