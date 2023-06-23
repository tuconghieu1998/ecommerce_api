import express from "express";
import auth from "../middlewares/auth.middleware.js";
import { getWislistItems, addItemToWishlist, removeItemFromWishlist } from "../controllers/wishlist.controller.js";
const router = express.Router();

router.get("/", auth, getWislistItems);
router.post("/", auth, addItemToWishlist);
router.delete("/:itemId/remove", auth, removeItemFromWishlist);

export default router;