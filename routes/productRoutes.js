import express from "express";
import {
  getProducts,
  searchProducts,
  getProductById,
  getProductsByCategory,
  getCategories,
  getHighlights,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/search", searchProducts);
router.get("/categories/all", getCategories);
router.get("/highlights/all", getHighlights);
router.get("/category/:category", getProductsByCategory);

router.route("/").get(getProducts).post(protect, admin, createProduct);
router
  .route("/:id")
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

export default router;
