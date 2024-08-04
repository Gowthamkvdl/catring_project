import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  addMessage,
  deleteMessages,
} from "../controllers/message.controller.js";

const router = express.Router();

router.post("/:id",verifyToken, addMessage);
router.delete("/",verifyToken, deleteMessages);


export default router    