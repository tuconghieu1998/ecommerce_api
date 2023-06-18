import {
  queryUsers
} from './user.service.js';

import {
  queryCategories,
  queryCategoryById,
  updateCategoryDetails,
  createCategory,
  deleteCategoryById
} from "./category.service.js"

const userService = {
  queryUsers
};

const categoryService = {
  queryCategories,
  queryCategoryById,
  updateCategoryDetails,
  createCategory,
  deleteCategoryById
};

export {
  userService,
  categoryService
};