import express from "express";
import { authTester } from "../controllers/auth.controller";

const router = express.Router();

router.get("/test",authTester)


export default router