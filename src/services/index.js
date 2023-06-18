import {
  queryUsers
} from './user.service.js';

import {
  queryCategories
} from "./category.service.js"

const userService = {
  queryUsers
};

const categoryService = {
  queryCategories
};

export {
  userService,
  categoryService
};