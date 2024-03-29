import express from "express";
import { getUsers, getProfile } from "../controllers/user.controller.js";
import auth from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get('/', getUsers);

router.get('/profile', auth, getProfile);

export default router;