import {
  queryUsers
} from './user.service.js';

import {
  queryCategories,
  queryCategoryById,
  updateCategoryDetails
} from "./category.service.js"

const userService = {
  queryUsers
};

const categoryService = {
  queryCategories,
  queryCategoryById,
  updateCategoryDetails
};

export {
  userService,
  categoryService
};