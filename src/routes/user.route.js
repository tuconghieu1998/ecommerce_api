import express from "express";
import { getUsers, getProfile } from "../controllers/user.controller.js";
import { 
  addItemToCart,
  getItemsInCart,
  clearAllItemsInCart,
  updateCartItem,
  removeItemFromCart
} from "../controllers/cart.controller.js";
import auth from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get('/', getUsers);

router.get('/profile', auth, getProfile);

router.post("/cart", auth, addItemToCart);

router.get("/cart", auth, getItemsInCart);

router.delete("/cart/clear", auth, clearAllItemsInCart);

router.put("/cart/:itemId/update", auth, updateCartItem);

router.delete("/cart/:itemId/remove", auth, removeItemFromCart);

export default router;