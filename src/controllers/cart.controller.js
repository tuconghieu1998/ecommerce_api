import { cartService } from "../services/index.js";
import catchAsync from "../utils/catchAsync.js";
import { ResponseType } from "../utils/constants.js";

export const addItemToCart = catchAsync(async (req, res) => {

  const { type, message, statusCode, item} = await cartService.addItemToCart(req.user, req.body);

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
    item
  });
});