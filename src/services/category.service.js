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
})