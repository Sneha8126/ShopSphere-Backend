import asyncHandler from "../utils/asyncHandler.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod } = req.body;

  if (!orderItems || orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items provided");
  }
  if (!shippingAddress) {
    res.status(400);
    throw new Error("Shipping address is required");
  }
  if (!paymentMethod) {
    res.status(400);
    throw new Error("Payment method is required");
  }

  // Re-validate items and prices against DB (never trust client-side prices)
  const dbItems = [];
  let subtotal = 0;

  for (const item of orderItems) {
    const product = await Product.findById(item.product);
    if (!product) {
      res.status(404);
      throw new Error(`Product not found: ${item.product}`);
    }
    if (product.stock < item.quantity) {
      res.status(400);
      throw new Error(`Insufficient stock for ${product.title}`);
    }

    dbItems.push({
      product: product._id,
      title: product.title,
      image: product.images[0],
      price: product.price,
      quantity: item.quantity,
    });

    subtotal += product.price * item.quantity;
    product.stock -= item.quantity;
    await product.save();
  }

  const shippingCost = subtotal > 999 ? 0 : 49;
  const total = subtotal + shippingCost;

  const order = await Order.create({
    user: req.user._id,
    orderItems: dbItems,
    shippingAddress,
    paymentMethod,
    paymentStatus: paymentMethod === "Test Card" ? "Paid" : "Pending",
    subtotal,
    shippingCost,
    total,
  });

  res.status(201).json({ success: true, order });
});

// @desc    Get logged-in user's orders
// @route   GET /api/orders
// @access  Private
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json({ success: true, orders });
});

// @desc    Get order by id
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate("user", "name email");

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== "admin") {
    res.status(403);
    throw new Error("Not authorized to view this order");
  }

  res.json({ success: true, order });
});

// @desc    Get all orders (admin)
// @route   GET /api/orders/admin/all
// @access  Private/Admin
export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "name email").sort({ createdAt: -1 });
  res.json({ success: true, orders });
});

// @desc    Update order status (admin)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  order.orderStatus = req.body.orderStatus || order.orderStatus;
  if (req.body.orderStatus === "Delivered") {
    order.deliveredAt = new Date();
    order.paymentStatus = "Paid";
  }

  const updated = await order.save();
  res.json({ success: true, order: updated });
});
