import express from "express";
import { register } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.get("/login", register);
router.get("/logout", register);

export default router;
