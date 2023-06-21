import express from "express";
import userRouter from './user.route.js';
import categoryRouter from './category.route.js';
import authRouter from './auth.route.js';
import productRouter from "./product.route.js";

const router = express.Router();

router.use('/api/users', userRouter);
router.use('/api/categories', categoryRouter);
router.use('/api/auth', authRouter);
router.use('/api/products', productRouter);

export default router;