import express from 'express';
import { 
  addItemToCart,
  getItemsInCart,
  clearAllItemsInCart,
  updateCartItem,
  removeItemFromCart
} from "../controllers/cart.controller.js";
import auth from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", auth, addItemToCart);

router.get("/", auth, getItemsInCart);

router.delete("/clear", auth, clearAllItemsInCart);

router.put("/:itemId/update", auth, updateCartItem);

router.delete("/:itemId/remove", auth, removeItemFromCart);

export default router;