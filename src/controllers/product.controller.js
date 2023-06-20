import { productService } from "../services/index.js";
import catchAsync from "../utils/catchAsync.js";
import { ResponseType } from "../utils/constants.js";

export const getProducts = catchAsync(async(req, res) => {
  let {page, sort, limit, select} = req.query;

  // setting default params
  if(!page) page = 1;
  if(!sort) sort = '';
  if(!limit) limit = 10;
  if(!select) select = '';

  // get all products
  const {type, message, statusCode, products} = await productService.getProducts(req);

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
    products
  })
})