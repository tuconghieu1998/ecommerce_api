import { Wishlist } from "../models/index.js";
import catchAsync from "../utils/catchAsync.js";
import { ResponseType } from "../utils/constants.js";

export const addItemToWishList = catchAsync(async (user, body) => {
  let {product_id} = body;
  console.log("addItemToWishList", user, product_id);
  // check params
  if(!product_id) {
    return {
      type: ResponseType.ERROR,
      message: "invalidArgument",
      statusCode: 400
    }
  }
  // find item is added to wish_list => if yes -> update is_deleted = 0
  const itemRows = await Wishlist.getItemByUserAndProductId(user.user_id, product_id);
  console.log("getItemByUserAndProductId", itemRows);
  if(itemRows.length > 0) {
    const wishlistItem = itemRows[0];
    const isDeleted = 0;
    const resultUpdate = await Wishlist.updateStatusItem(wishlistItem.id, isDeleted);
    if(resultUpdate.affectedRows === 0) {
      return  {
        type: ResponseType.ERROR,
        message: "databaseUpdateError",
        statusCode: 400
      }
    }
  }
  else {
    const resultCreate = await Wishlist.addItem(user.user_id, product_id);
  }

  const createItemRows = await Wishlist.getWishlistItems(user.user_id);
  console.log("getWishlistItems", user.user_id, createItemRows);
  if(createItemRows.length ===0) {
    return {
      type: ResponseType.ERROR,
      message: "noItemCreated",
      statusCode: 400
    }
  }

  // 4) If everything is OK, send data
  return {
    type: ResponseType.SUCCESS,
    message: 'successfulCreateCartItem',
    statusCode: 200,
    items: createItemRows
  };
});

export const getWishlistItems = catchAsync(async (user) => {
  console.log("getWishlistItems", user.user_id);
  const itemRows = await Wishlist.getWishlistItems(user.user_id);
  // 4) If everything is OK, send data
  return {
    type: ResponseType.SUCCESS,
    message: 'successfulGetWishlistItems',
    statusCode: 200,
    items: itemRows
  };
});

export const removeItemFromWishlist = catchAsync(async (user, itemId) => {
  console.log("removeItemFromWishlist", user, itemId);

  // check item in wishlist
  const itemRows = await Wishlist.getItem(itemId);
  if(itemRows.length == 0 || itemRows[0].user_id != user.user_id) {
    return  {
      type: ResponseType.ERROR,
      message: "notAuthoried",
      statusCode: 400
    }
  }

  const isDeleted = 1;
  const result = await Wishlist.updateStatusItem(itemId, isDeleted);
  if(result.affectedRows === 0) {
    return  {
      type: ResponseType.ERROR,
      message: "databaseRemoveWishlistItemError",
      statusCode: 400
    }
  }

  // 4) If everything is OK, send data
  return {
    type: ResponseType.SUCCESS,
    message: 'successfulRemoveWishlistItem',
    statusCode: 200,
  };
});