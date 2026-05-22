import express from "express";
import {requireSignIn,isAdmin} from "../middleware/auth.js";

import {createOrder,getUserOrders,getAllOrders,updateOrderStatus} from "../controllers/orderController.js";

const router = express.Router();


router.post("/create-order", requireSignIn, createOrder);
// GET USER ORDERS
router.get(
  "/my-orders",
  requireSignIn,
  getUserOrders
);
//admin orders
router.get("/all",requireSignIn,isAdmin,getAllOrders);
router.put("/order-status/:orderId",requireSignIn,isAdmin,updateOrderStatus);




export default router;