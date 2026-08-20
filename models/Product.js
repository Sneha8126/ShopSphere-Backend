import mongoose from "mongoose";
import slugify from "slugify";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    originalPrice: { type: Number, required: true, min: 0 },
    discount: { type: Number, default: 0 },
    category: { type: String, required: true, index: true },
    subCategory: { type: String, default: "" },
    brand: { type: String, required: true },
    images: {
      type: [String],
      default: [],
      validate: (arr) => arr.length > 0,
    },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    numReviews: { type: Number, default: 0 },
    stock: { type: Number, required: true, min: 0, default: 0 },
    specifications: {
      type: Map,
      of: String,
      default: {},
    },
    features: { type: [String], default: [] },
    seller: { type: String, default: "ShopSphere Retail" },
    isFeatured: { type: Boolean, default: false },
    isBestSeller: { type: Boolean, default: false },
  },
  { timestamps: true }
);

productSchema.index({ title: "text", description: "text", brand: "text", category: "text" });

productSchema.pre("validate", function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true }) + "-" + Math.random().toString(36).slice(2, 7);
  }
  if (this.originalPrice && this.price) {
    this.discount = Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
  }
  next();
});

const Product = mongoose.model("Product", productSchema);
export default Product;
