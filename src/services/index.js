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

export {
  userService,
  categoryService,
  authService,
  productService
};