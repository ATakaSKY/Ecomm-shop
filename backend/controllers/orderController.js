import expressAsyncHandler from "express-async-handler";

import Order from "../models/orderModel.js";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = expressAsyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (!orderItems?.length) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      user: req.user._id,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// @desc    Get order by ID
// @route   POST /api/orders/:id
// @access  Private
const getSingleOrder = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  } else {
    res.status(200).json(order);
  }
});

// @desc    update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  } else {
    order.paidAt = Date.now();
    order.isPaid = true;
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  }
});

// @desc    get logged in user orders
// @route   GET /api/orders/myOrders
// @access  Private
const getUserOrders = expressAsyncHandler(async (req, res) => {
  console.log(req.user._id);
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

// @desc    get all orders for admin
// @route   GET /api/orders
// @access  Private/Admin
const getAllOrders = expressAsyncHandler(async (req, res) => {
  const orders = await Order.find().populate("user", "id name");
  res.status(200).json(orders);
});

// @desc    update order to delivered
// @route   PUT /api/orders/:id/delivered
// @access  Private/Admin
const updateOrderToDelivered = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  } else {
    order.deliveredAt = Date.now();
    order.isDelivered = true;

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  }
});

export {
  createOrder,
  getSingleOrder,
  updateOrderToPaid,
  getUserOrders,
  getAllOrders,
  updateOrderToDelivered,
};
