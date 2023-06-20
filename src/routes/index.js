import express from "express";
import userRouter from './user.route.js';
import categoryRouter from './category.route.js';
import authRouter from './auth.route.js';

const router = express.Router();

router.use('/users', userRouter);
router.use('/api/categories', categoryRouter);
router.use('/auth', authRouter);

export default router;