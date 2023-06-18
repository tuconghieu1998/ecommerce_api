import {
  queryUsers
} from './user.service.js';

import {
  queryCategories,
  queryCategoryById
} from "./category.service.js"

const userService = {
  queryUsers
};

const categoryService = {
  queryCategories,
  queryCategoryById
};

export {
  userService,
  categoryService
};