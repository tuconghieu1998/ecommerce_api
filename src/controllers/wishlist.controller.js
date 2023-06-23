import { wishlistService } from "../services/index.js";
import catchAsync from "../utils/catchAsync.js";
import { ResponseType } from "../utils/constants.js";


export const getWislistItems = catchAsync(async (req, res) => {

  const { type, message, statusCode, items} = await wishlistService.getWishlistItems(req.user);

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
    wishlist: items
  });
});

export const addItemToWishlist = catchAsync(async (req, res) => {

  const { type, message, statusCode, items} = await wishlistService.addItemToWishList(req.user, req.body);

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
    wishlist: items
  });
});

export const removeItemFromWishlist = catchAsync(async (req, res) => {

  const { type, message, statusCode} = await wishlistService.removeItemFromWishlist(req.user, req.params.itemId);

  // 3) If everything is OK, send data
  return res.status(statusCode).json({
    type,
    message
  });
});