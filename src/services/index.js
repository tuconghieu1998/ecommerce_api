import {
  queryUsers,
  getProfile
} from './user.service.js';

import {
  queryCategories,
  queryCategoryById,
  updateCategoryDetails,
  createCategory,
  deleteCategoryById
} from "./category.service.js";

import {
  registerUser,
  login
}
from './auth.service.js';

import {
  getProducts,
  getProductById
}
from "./product.service.js";

import {
  addItemToCart,
  getItemsInCart,
  clearAllItemsInCart,
  updateCartItem,
  removeItemFromCart
}
from "./cart.service.js";

import {
  addItemToWishList,
  getWishlistItems,
  removeItemFromWishlist
}
from './wishlist.service.js';

const userService = {
  queryUsers,
  getProfile
};

const categoryService = {
  queryCategories,
  queryCategoryById,
  updateCategoryDetails,
  createCategory,
  deleteCategoryById
};

const authService = {
  registerUser,
  login
};

const productService = {
  getProducts,
  getProductById
};

const cartService = {
  addItemToCart,
  getItemsInCart,
  clearAllItemsInCart,
  updateCartItem,
  removeItemFromCart
}

const wishlistService = {
  addItemToWishList,
  getWishlistItems,
  removeItemFromWishlist
}

export {
  userService,
  categoryService,
  authService,
  productService,
  cartService,
  wishlistService
};