import asyncHandler from "../utils/asyncHandler.js";
import Product from "../models/Product.js";

// @desc    Get products with filtering, sorting, pagination
// @route   GET /api/products
// @access  Public
export const getProducts = asyncHandler(async (req, res) => {
  const {
    keyword,
    category,
    brand,
    minPrice,
    maxPrice,
    minRating,
    sort,
    page = 1,
    limit = 12,
  } = req.query;

  const query = {};

  if (keyword) {
    query.$text = { $search: keyword };
  }
  if (category) {
    query.category = { $regex: new RegExp(`^${category}$`, "i") };
  }
  if (brand) {
    query.brand = { $regex: new RegExp(`^${brand}$`, "i") };
  }
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }
  if (minRating) {
    query.rating = { $gte: Number(minRating) };
  }

  let sortOption = { createdAt: -1 };
  if (sort === "price_asc") sortOption = { price: 1 };
  if (sort === "price_desc") sortOption = { price: -1 };
  if (sort === "rating") sortOption = { rating: -1 };
  if (sort === "newest") sortOption = { createdAt: -1 };
  if (sort === "discount") sortOption = { discount: -1 };

  const pageNum = Math.max(1, Number(page));
  const limitNum = Math.min(50, Math.max(1, Number(limit)));
  const skip = (pageNum - 1) * limitNum;

  const [products, total] = await Promise.all([
    Product.find(query).sort(sortOption).skip(skip).limit(limitNum),
    Product.countDocuments(query),
  ]);

  res.json({
    success: true,
    products,
    page: pageNum,
    pages: Math.ceil(total / limitNum),
    total,
  });
});

// @desc    Search products
// @route   GET /api/products/search
// @access  Public
export const searchProducts = asyncHandler(async (req, res) => {
  const { q, page = 1, limit = 12, sort } = req.query;

  if (!q || !q.trim()) {
    return res.json({ success: true, products: [], page: 1, pages: 0, total: 0, query: "" });
  }

  const regex = new RegExp(q.trim(), "i");
  const query = {
    $or: [{ title: regex }, { description: regex }, { category: regex }, { brand: regex }],
  };

  let sortOption = { createdAt: -1 };
  if (sort === "price_asc") sortOption = { price: 1 };
  if (sort === "price_desc") sortOption = { price: -1 };
  if (sort === "rating") sortOption = { rating: -1 };

  const pageNum = Math.max(1, Number(page));
  const limitNum = Math.min(50, Math.max(1, Number(limit)));
  const skip = (pageNum - 1) * limitNum;

  const [products, total] = await Promise.all([
    Product.find(query).sort(sortOption).skip(skip).limit(limitNum),
    Product.countDocuments(query),
  ]);

  res.json({ success: true, products, page: pageNum, pages: Math.ceil(total / limitNum), total, query: q });
});

// @desc    Get single product by id or slug
// @route   GET /api/products/:id
// @access  Public
export const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const isObjectId = id.match(/^[0-9a-fA-F]{24}$/);

  const product = isObjectId
    ? await Product.findById(id)
    : await Product.findOne({ slug: id });

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.json({ success: true, product });
});

// @desc    Get products by category
// @route   GET /api/products/category/:category
// @access  Public
export const getProductsByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;
  const { page = 1, limit = 12 } = req.query;

  const pageNum = Math.max(1, Number(page));
  const limitNum = Math.min(50, Math.max(1, Number(limit)));
  const skip = (pageNum - 1) * limitNum;

  const query = { category: { $regex: new RegExp(`^${category}$`, "i") } };

  const [products, total] = await Promise.all([
    Product.find(query).skip(skip).limit(limitNum).sort({ createdAt: -1 }),
    Product.countDocuments(query),
  ]);

  res.json({ success: true, products, page: pageNum, pages: Math.ceil(total / limitNum), total });
});

// @desc    Get distinct categories
// @route   GET /api/products/categories/all
// @access  Public
export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Product.distinct("category");
  res.json({ success: true, categories });
});

// @desc    Get featured / deals / best seller products
// @route   GET /api/products/highlights/all
// @access  Public
export const getHighlights = asyncHandler(async (req, res) => {
  const [featured, deals, bestSellers] = await Promise.all([
    Product.find({ isFeatured: true }).limit(8),
    Product.find({ discount: { $gte: 20 } }).sort({ discount: -1 }).limit(8),
    Product.find({ isBestSeller: true }).limit(8),
  ]);

  res.json({ success: true, featured, deals, bestSellers });
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, product });
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  Object.assign(product, req.body);
  const updated = await product.save();
  res.json({ success: true, product: updated });
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  await product.deleteOne();
  res.json({ success: true, message: "Product removed" });
});
