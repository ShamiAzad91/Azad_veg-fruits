import Product from "../models/productModel.js";
import slugify from "slugify";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import Category from "../models/categoryModel.js";

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      quantity,
      unit,
      stock,
      category,
      isAvailable,
    } = req.body;

    // console.log("Body:", req.body);
    // console.log("File:", req.file);

    // 1️⃣ Validate image
    if (!req.file) {
      return res.status(400).json({ msg: "Image is required" });
    }

    // 2️⃣ Upload image to Cloudinary
    const image = await uploadOnCloudinary(req.file.path);

    if (!image) {
      return res.status(500).json({ msg: "Image upload failed" });
    }

    // 3️⃣ Create product
    const product = await Product.create({
      name,
      slug: slugify(`${name}-${quantity}-${unit}`),
      description,
      price,
      quantity,
      unit,
      stock,
      category,
      isAvailable,
      image: image.secure_url,
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (err) {
    return res.status(500).json({
      msg: "Something went wrong",
      error: err.message,
      status: "failed",
    });
  }
};

// GET /api/product/popular
export const getPopularProducts = async (req, res) => {
  try {
    const products = await Product.find({})
      .sort({ sold: -1 })   // highest sold first
      .limit(8);            // only top 8

    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting popular products",
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ updatedAt: -1, createdAt: -1 })
    // console.log("length=>",products.length);
    if (products.length === 0) {
      return res
        .status(200)
        .json({ msg: "there is no product in DB", status: "success" });
    }
    return res.status(200).json({
      msg: "All products is here",
      status: "success",
      Total_products: products.length,
      products,
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      msg: "Something went wrong",
      error: err.message,
    });
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const { slug } = req.params;
    if (!slug) {
      return res
        .status(404)
        .json({ msg: "Please include the product slug", status: "failed" });
    }
    const product = await Product.findOne({ slug }).populate(
      "category",
      "name slug",
    );
    if (!product) {
      return res
        .status(404)
        .json({ msg: "there is no product with this slug name" });
    }
    return res.status(200).json({
      product: product,
      msg: "get product details",
      status: "success",
    });
  } catch (err) {
    return res.status(500).json({
      msg: "Something went wrong",
      error: err.message,
      status: "failed",
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ msg: "product not found", status: "failed" });
    }

    const {
      name,
      description,
      price,
      quantity,
      unit,
      stock,
      category,
      isAvailable,
    } = req.body;

    // 3️⃣ Update fields safely
    if (name !== undefined) product.name = name;
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = price;
    if (stock !== undefined) product.stock = stock;
    if (quantity !== undefined) product.quantity = quantity;
    if (unit !== undefined) product.unit = unit;
    if (category !== undefined) product.category = category;
    if (isAvailable !== undefined) product.isAvailable = isAvailable;

    //optional  if admin want to update the image of product
    if(req.file){
       const result = await uploadOnCloudinary(req.file?.path);
       product.image = result.secure_url
    }
  
    await product.save();
    return res.status(200).json({msg:"successfully updated",status:"success",product})

  } catch (err) {
    return res.status(500).json({
      msg: "Something went wrong",
      error: err.message,
      status: "failed",
    });
  }
};



export const removeProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ msg: "product not found", status: "failed" });
    }


    await product.deleteOne();
    res.status(200).json({msg:"deleted successfully",status:"success",product:{
      remove_products_details:product
    }})


  

  } catch (err) {
    return res.status(500).json({
      msg: "Something went wrong",
      error: err.message,
      status: "failed",
    });
  }
};



export const filteredProducts = async (req, res) => {
  try {
    const { checked, radio } = req.body;

    let args = {};

    // ✅ CATEGORY FILTER
    if (checked && checked.length > 0) {
      args.category = checked;
    }

    // ✅ PRICE FILTER
    if (radio && radio.length > 0) {
      args.price = {
        $gte: radio[0],
        $lte: radio[1],
      };
    }

    // console.log("args is", args);

    const products = await Product.find(args);

    console.log("products found:", products.length);

    res.json({
      success: true,
      products,
    });

  } catch (err) {
    return res.status(500).json({
      msg: "Something went wrong",
      error: err.message,
      status: "failed",
    });
  }
};


export const productsCount = async (req, res) => {
  try {
    const total = await Product.estimatedDocumentCount();

    res.json({
      success: true,
      total,
    });

  } catch (err) {
    return res.status(500).json({
      msg: "Something went wrong",
      error: err.message,
      status: "failed",
    });
  }
};


export const listProducts = async (req, res) => {
  try {
    const perPage = 3;

    // ✅ Convert to number + validation
    let page = Number(req.params.page) || 1;
    if (page < 1) page = 1;

    const total = await Product.countDocuments();

    const products = await Product.find({})
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      page,
      total,
      totalPages: Math.ceil(total / perPage),
      products,
    });

  } catch (err) {
    return res.status(500).json({
      msg: "Something went wrong",
      error: err.message,
      status: "failed",
    });
  }
};


export const searchProducts = async (req, res) => {
  try {
    const { keyword } = req.params;

    const results = await Product.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },       // search by name
        { description: { $regex: keyword, $options: "i" } } // search by description
      ]
    });

    return res.status(200).json({
      success: true,
      count: results.length,
      products: results
    });

  } catch (err) {
    return res.status(500).json({
      msg: "Something went wrong",
      error: err.message,
      status: "failed",
    });
  }
};


export const productCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });

    const products = await Product.find({
      category: category._id,
    });

    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting category products",
    });
  }
};