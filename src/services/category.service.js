import catchAsync from "../utils/catchAsync.js";
import { ResponseType } from "../utils/constants.js";
import Category from "../models/category.model.js";

/**
 * @desc Query Categories
 * @param {Object} req - Request Object
 * @returns {Object<type|message|statusCode|categories>}
 * 
*/
export const queryCategories = catchAsync(async(req) => {
  const categories = await Category.getAllCategories();

  // check if categories doesn't exist
  if(categories.length === 0) {
    return {
      type: ResponseType.ERROR,
      message: "noCategoriesFound",
      statusCode: 404
    }
  }

  // if everything is OK, send data
  return {
    type: ResponseType.SUCCESS,
    message: 'successfulCategorysFound',
    statusCode: 200,
    categories     
  }
});

export const queryCategoryById = catchAsync(async(id, req) => {
  const categories = await Category.getCategoryById(id);

  // check if categories doesn't exist
  if(categories.length === 0) {
    return {
      type: ResponseType.ERROR,
      message: "noCategoriesFound",
      statusCode: 404
    }
  }

  // if everything is OK, send data
  return {
    type: ResponseType.SUCCESS,
    message: 'successfulCategorysFound',
    statusCode: 200,
    category: categories[0]     
  }
});

export const updateCategoryDetails = catchAsync(async (id, body) => {
  // 3) Find category document and update it
  await Category.updateCategoryDetailsById(id, body);

  const categories = await Category.getCategoryById(id);
  if(categories.length ===0) {
    // check if categories doesn't exist
    if(categories.length === 0) {
      return {
        type: ResponseType.ERROR,
        message: "noCategoriesFound",
        statusCode: 404
      }
    }
  }

  // 4) If everything is OK, send data
  return {
    type: ResponseType.SUCCESS,
    message: 'successfulCategoryDetails',
    statusCode: 200,
    category: categories[0]
  };
});

export const createCategory = catchAsync(async (body) => {
  console.log('createCategory', body);
  const {name, description} = body;
  // check params
  if(!name) {
    return {
      type: ResponseType.ERROR,
      message: "invalidArgument",
      statusCode: 400
    }
  }
  if(!description) {
    description = '';
  }

  // create category
  let result = await Category.createCategory(body);

  const categories = await Category.getCategoryById(result.insertId);
  if(categories.length ===0) {
    // check if categories doesn't exist
    if(categories.length === 0) {
      return {
        type: ResponseType.ERROR,
        message: "noCategoriesFound",
        statusCode: 404
      }
    }
  }

  // 4) If everything is OK, send data
  return {
    type: ResponseType.SUCCESS,
    message: 'successfulCreateCategory',
    statusCode: 200,
    category: categories[0]
  };
});