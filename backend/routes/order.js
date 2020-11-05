import express from "express";
import {
  createOrder,
  getUserOrders,
  getSingleOrder,
  updateOrderToPaid,
  getAllOrders,
  updateOrderToDelivered,
} from "../controllers/orderController.js";
import protect, { isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(protect, createOrder)
  .get(protect, isAdmin, getAllOrders);
router.route("/myOrders").get(protect, getUserOrders);
router.route("/:id").get(protect, getSingleOrder);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/delivered").put(protect, isAdmin, updateOrderToDelivered);

export default router;
