import catchAsync from "../utils/catchAsync.js";
import { ResponseType } from "../utils/constants.js";
import { Product } from "../models/index.js";

export const getProducts = catchAsync(async(req) => {
  const products = await Product.getAllProducts();

  // check if products doesn't exist
  if(products.length === 0) {
    return {
      type: ResponseType.ERROR,
      message: "noProductsFound",
      statusCode: 404
    }
  }

  // if everything is OK, send data
  return {
    type: ResponseType.SUCCESS,
    message: 'successfulProductsFound',
    statusCode: 200,
    products     
  }
});

export const getProductById = catchAsync(async(id) => {
  const productRows = await Product.getProductById(id);

  // check if product doesn't exist
  if(productRows.length === 0) {
    return {
      type: ResponseType.ERROR,
      message: "noProductFound",
      statusCode: 404
    }
  }

  const product = productRows[0];

  // if everything is OK, send data
  return {
    type: ResponseType.SUCCESS,
    message: 'successfulProductFound',
    statusCode: 200,
    product     
  }
});