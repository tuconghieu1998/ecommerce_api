import express from "express";
import userRouter from './user.route.js';
import categoryRouter from './category.route.js';
import authRouter from './auth.route.js';
import productRouter from "./product.route.js";
import cartRouter from "./cart.route.js";
import wishlistRouter from "./wishlist.route.js";
import addressRouter from "./address.route.js";

const router = express.Router();

router.use('/api/users', userRouter);
router.use('/api/categories', categoryRouter);
router.use('/api/auth', authRouter);
router.use('/api/products', productRouter);
router.use('/api/cart', cartRouter);
router.use('/api/wishlist', wishlistRouter);
router.use('/api/cart', cartRouter);
router.use('/api/address', addressRouter);

export default router;