import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUserProfile,
  login,
  registerUser,
  updateUserProfile,
  getUserProfileAdmin,
  updateUserProfileAdmin,
} from "../controllers/userController.js";
import protect, { isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);

router.get("/users", protect, isAdmin, getAllUsers);
router
  .route("/:id")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/users/:id")
  .delete(protect, isAdmin, deleteUser)
  .get(protect, isAdmin, getUserProfileAdmin)
  .put(protect, isAdmin, updateUserProfileAdmin);

export default router;
