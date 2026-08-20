import express from "express";
import { getProductReviews, createReview, deleteReview } from "../controllers/reviewController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/:productId").get(getProductReviews).post(protect, createReview);
router.delete("/single/:reviewId", protect, deleteReview);

export default router;
