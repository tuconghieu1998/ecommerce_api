import { cartService } from "../services/index.js";
import catchAsync from "../utils/catchAsync.js";
import { ResponseType } from "../utils/constants.js";

export const addItemToCart = catchAsync(async (req, res) => {

  const { type, message, statusCode, cart} = await cartService.addItemToCart(req.user, req.body);

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
    cart
  });
});

export const getItemsInCart = catchAsync(async (req, res) => {

  const { type, message, statusCode, cart} = await cartService.getItemsInCart(req.user);

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
    cart
  });
});

export const clearAllItemsInCart = catchAsync(async (req, res) => {

  const { type, message, statusCode} = await cartService.clearAllItemsInCart(req.user);

  // 3) If everything is OK, send data
  return res.status(statusCode).json({
    type,
    message
  });
});

export const removeItemFromCart = catchAsync(async (req, res) => {

  const { type, message, statusCode} = await cartService.removeItemFromCart(req.user, req.params.itemId);

  // 3) If everything is OK, send data
  return res.status(statusCode).json({
    type,
    message
  });
});

export const updateCartItem = catchAsync(async (req, res) => {

  const { type, message, statusCode, item} = await cartService.updateCartItem(req.user, req.params.itemId, req.body);

  // 3) If everything is OK, send data
  return res.status(statusCode).json({
    type,
    message,
    item
  });
});