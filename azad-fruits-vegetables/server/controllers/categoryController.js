import Category from "../models/categoryModel.js";
import slugify from "slugify";

export const create = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || name.length < 3) {
      return res
        .status(400)
        .json({ msg: "name is required", status: "failed" });
    }
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res
        .status(400)
        .json({ msg: "category already exists ", status: "failed" });
    }

    const category = await Category.create({
      name,
      slug: slugify(name),
    });
    res.status(201).json({
      status: "success",
      msg: "Category created successfully",
      category,
    });
  } catch (err) {
    return res
      .status(500)
      .json({
        err: err.message,
        msg: "something went wrong",
        status: "failed",
      });
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    let { name } = req.body;
    if (!name || name.trim().length < 3) {
      return res
        .status(400)
        .json({ msg: "name is required", status: "failed" });
    }

    const existingCategory = await Category.findOne({ name });
    if (existingCategory && existingCategory._id.toString() !== id) {
      return res.status(409).json({
        msg: "Category already exists",
      });
    }
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      {
        name: name,
        slug: slugify(name),
      },
      { new: true },
    );

    if (!updatedCategory) {
      return res.status(404).json({
        status: "failed",
        msg: "Category not found",
      });
    }

    res.status(200).json({
      status: "success",
      msg: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (err) {
    return res
      .status(500)
      .json({
        err: err.message,
        msg: "something went wrong",
        status: "failed",
      });
  }
};


export const getAllCategory = async(req,res)=>{
    try {
        const category = await Category.find({}).sort({ createdAt: -1 });;
        if(category.length < 0){
            return res.status(400).json({err:'',msg:"No category found",status:"failed"})
        }

        return res.status(200).json({category,msg:"Successfully fetched all category",status:"success"})
    } catch (err) {
        return res
      .status(500)
      .json({
        err: err.message,
        msg: "something went wrong",
        status: "failed",
      }); 
    }
}


export const getSingleCategory = async(req,res)=>{
    try {
        const {slug} = req.params;
        const category = await Category.findOne({slug});
        if(!category){
            return res.status(400).json({err:'',msg:"No category found",status:"failed"})
        }
          res.status(200).json({
      status: "success",
      msg: "Category fetched successfully",
      category,
    });
    } catch (err) {
        return res
      .status(500)
      .json({
        err: err.message,
        msg: "something went wrong",
        status: "failed",
      }); 
    }
}


export const remove = async (req, res) => {
  try {
    const removed = await Category.findByIdAndDelete(req.params.id);

    // If category does not exist
    if (!removed) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json({
      success: true,
      message: "Category deleted successfully",
      removed,
    });
  } catch (error) {
    console.log("Delete Category Error:", error);
    res.status(500).json({ error: "Server Error" });
  }
};