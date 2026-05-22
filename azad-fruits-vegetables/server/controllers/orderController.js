// controllers/orderController.js

import Order from "../models/orderModel.js";
import Product from "../models/productModel.js"

export const createOrder = async (req, res) => {
  try {
  // console.log("ORDER API HIT");
    const {
      cart,
      totalAmount,
      shippingAddress,
    } = req.body;

    // validation
    if (!cart || cart.length === 0) {
      return res.status(400).send({
        success: false,
        message: "Cart is empty",
      });
    }

    if (!shippingAddress) {
      return res.status(400).send({
        success: false,
        message: "Shipping address is required",
      });
    }

    // create order
    const order = await new Order({
      products: cart.map((item) => item._id),

      buyer: req.user._id,

      totalAmount,

      shippingAddress,

      paymentMethod: "COD",
    }).save();

    //decrement quantity
    const uniqueCart = [
  ...new Map(
    cart.map(item => [item._id, item])
  ).values()
];

await decrementQuantity(uniqueCart);

    res.status(201).send({
      success: true,
      message: "Order Placed Successfully",
      order,
    });

  } catch (error) {

    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error in create order api",
      error,
    });

  }
};


const decrementQuantity = async(cart)=>{
  try {

    const bulkOps = cart.map((item)=>{
      return{
        updateOne:{
          filter:{_id:item._id},
          update:{$inc:{stock:-1,sold:+1}}
        }
      }
    });

    const updated = await Product.bulkWrite(bulkOps,{});
    console.log("blk update",updated);
    
    
  } catch (err) {
    console.log(err)
  }
}

// GET LOGGED IN USER ORDERS
export const getUserOrders = async (req, res) => {

  try {

 const orders = await Order.find({
  buyer: req.user._id,
})
.populate("products")
.populate("buyer", "name")
.sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      orders,
    });

  } catch (error) {
    console.log(error);
  }
};


export const getAllOrders = async (req, res) => {
  try {

    const orders = await Order.find({})
      .populate("products")
      .populate("buyer", "name")
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      orders,
    });

  } catch (error) {

    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error while getting orders",
      error,
    });

  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { orderStatus } = req.body;

    const order = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Order status updated",
      order,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error updating order status",
      error,
    });
  }
};