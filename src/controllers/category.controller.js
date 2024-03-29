import { categoryService } from "../services/index.js";
import catchAsync from "../utils/catchAsync.js";
import { ResponseType } from "../utils/constants.js";

/**
 * @desc  Get All Categories Controllers
 * @param {Object} req - Request Object
 * @param {Object} res - Response Object
 * @property {String} req.query.sort - Sort returned data
 * @property {String} req.query.select - Select specific fields
 * @property {Number} req.query.page - Page number
 * @property {Number} req.query.limit - Maximum number of categories in page
 * @returns {JSON} - A JSON object representing the type, message and categories
*/
export const getCategories = catchAsync(async (req, res) => {
  let {page, sort, limit, select} = req.query;

  // setting default params
  if(!page) page = 1;
  if(!sort) sort = '';
  if(!limit) limit = 10;
  if(!select) select = '';

  // get all categories
  const {type, message, statusCode, categories} = await categoryService.queryCategories(req);

  // check error
  if(type == ResponseType.ERROR) {
    return res.status(statusCode).json({
      type,
      message: message
    })
  }

  // if everything is OK, send data
  return res.status(statusCode).json({
    type,
    message,
    categories
  })
});

export const getCategoryById = catchAsync(async (req, res) => {

  // get category by id
  const {type, message, statusCode, category} = await categoryService.queryCategoryById(req.params.id);

  // check error
  if(type == ResponseType.ERROR) {
    return res.status(statusCode).json({
      type,
      message: message
    })
  }

  // if everything is OK, send data
  return res.status(statusCode).json({
    type,
    message,
    category
  })
});

export const updateCategoryDetails = catchAsync(async (req, res) => {
  // 1) Find category document and update it's details
  const { type, message, statusCode, category } = await categoryService.updateCategoryDetails(req.params.id, req.body);

  // 2) Check if there is an error
  if (type === ResponseType.ERROR) {
    return res.status(statusCode).json({
      type,
      message
    });
  }

  // 3) If everything is OK, send data
  return res.status(statusCode).json({
    type,
    message,
    category
  });
});

export const createCategory = catchAsync(async (req, res) => {
  // 1) Find category document and update it's details
  const { type, message, statusCode, category } = await categoryService.createCategory(req.body);

  // 2) Check if there is an error
  if (type === ResponseType.ERROR) {
    return res.status(statusCode).json({
      type,
      message
    });
  }

  // 3) If everything is OK, send data
  return res.status(statusCode).json({
    type,
    message,
    category
  });
});

export const deleteCategoryById = catchAsync(async (req, res) => {
  // 1) Find category document and delete it
  const {type, message, statusCode} = await categoryService.deleteCategoryById(req.params.id);

  // 2) Check if there is an error
  if (type === ResponseType.ERROR) {
    return res.status(statusCode).json({
      type,
      message
    });
  }

  // 3) If everything is OK, send data
  return res.status(statusCode).json({
    type,
    message
  });
});