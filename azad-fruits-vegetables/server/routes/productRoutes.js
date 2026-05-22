import express from "express";
import { requireSignIn, isAdmin } from "../middleware/auth.js";
import {
  createProduct,
  getPopularProducts,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  removeProduct,
  filteredProducts,
  listProducts,
  productsCount,
  searchProducts,
  productCategory
} from "../controllers/productController.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

router.post(
  "/create",
  requireSignIn,
  isAdmin,
  upload.single("image"),
  createProduct,
);

router.get("/popular", getPopularProducts);

router.get("/all", getAllProducts);
router.get("/single/:slug", getSingleProduct);
router.put(
  "/update/:productId",
  requireSignIn,
  isAdmin,
  upload.single("image"),
  updateProduct,
);
router.delete("/remove/:productId", requireSignIn, isAdmin, removeProduct);

router.post("/filtered-products", filteredProducts);

router.get("/products-count", productsCount);
router.get("/list-products/:page", listProducts);
router.get("/search/:keyword", searchProducts);

router.get("/category/:slug", productCategory);
export default router;
