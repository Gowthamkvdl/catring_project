import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
  savePost,
  profilePosts,
  addUserRating,
  getUserRating
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/oneuser/:id",verifyToken, getUser);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);
router.post("/save", verifyToken, savePost )
router.post("/rating", verifyToken, addUserRating )
router.get("/rating/:id", verifyToken, getUserRating )
router.get("/profilePosts/:id", verifyToken, profilePosts);


export default router    