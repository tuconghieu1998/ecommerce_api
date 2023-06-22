import catchAsync from "../utils/catchAsync.js";
import {Cart} from '../models/index.js';
import { ResponseType } from "../utils/constants.js";

export const addItemToCart = catchAsync(async (user, body) => {
  let {product_id, quantity} = body;
  console.log("addItemToCart", user, product_id, quantity);
  // check params
  if(!product_id) {
    return {
      type: ResponseType.ERROR,
      message: "invalidArgument",
      statusCode: 400
    }
  }
  if(!quantity) {
    quantity = 1;
  }
  // find item is added to cart => if yes -> add quantity
  const itemRows = await Cart.getItemByUserAndProductId(user.user_id, product_id);
  console.log("getItemByUserAndProductId", itemRows);
  if(itemRows.length > 0) {
    const cartItem = itemRows[0];
    const resultUpdate = await Cart.updateQuantityItem(cartItem.id, Number(cartItem.quantity) + Number(quantity));
    if(resultUpdate.affectedRows === 0) {
      return  {
        type: ResponseType.ERROR,
        message: "databaseUpdateError",
        statusCode: 400
      }
    }
  }
  else {
    const resultCreate = await Cart.addItem(user.user_id, product_id, quantity);
  }

  const createItemRows = await Cart.getItemsInCart(user.user_id);
  console.log("getItemsInCart", user.user_id, createItemRows);
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
    cart: createItemRows
  };
});

export const getItemsInCart = catchAsync(async (user) => {
  console.log("getItemsInCart", user.user_id);
  const itemRows = await Cart.getItemsInCart(user.user_id);
  // 4) If everything is OK, send data
  return {
    type: ResponseType.SUCCESS,
    message: 'successfulGetItemsInCart',
    statusCode: 200,
    cart: itemRows
  };
});

export const clearAllItemsInCart = catchAsync(async (user) => {
  console.log("clearAllItemsInCart", user);

  const result = await Cart.clearCart(user.user_id);
  if(result.affectedRows === 0) {
    return  {
      type: ResponseType.ERROR,
      message: "databaseClearCartItemsError",
      statusCode: 400
    }
  }

  // 4) If everything is OK, send data
  return {
    type: ResponseType.SUCCESS,
    message: 'successfulClearAllCartItems',
    statusCode: 200,
  };
});

export const removeItemFromCart = catchAsync(async (user, itemId) => {
  console.log("removeItemFromCart", user, itemId);

  // check item in user cart
  const itemRows = await Cart.getItem(itemId);
  if(itemRows.length == 0 || itemRows[0].user_id != user.user_id) {
    return  {
      type: ResponseType.ERROR,
      message: "notAuthoried",
      statusCode: 400
    }
  }

  const result = await Cart.removeItem(itemId);
  if(result.affectedRows === 0) {
    return  {
      type: ResponseType.ERROR,
      message: "databaseClearCartItemsError",
      statusCode: 400
    }
  }

  // 4) If everything is OK, send data
  return {
    type: ResponseType.SUCCESS,
    message: 'successfulClearCartItem',
    statusCode: 200,
  };
});

export const updateCartItem = catchAsync(async (user, itemId, body) => {
  console.log("updateCartItem", user, itemId);

  // check item in user cart
  const itemRows = await Cart.getItem(itemId);
  if(itemRows.length == 0 || itemRows[0].user_id != user.user_id) {
    return  {
      type: ResponseType.ERROR,
      message: "notAuthoried",
      statusCode: 400
    }
  }

  // check params
  const {quantity} = body;
  if(!quantity || quantity <= 0) {
    return  {
      type: ResponseType.ERROR,
      message: "invalidParams",
      statusCode: 400
    }
  }

  const result = await Cart.updateQuantityItem(itemId, quantity);
  if(result.affectedRows === 0) {
    return  {
      type: ResponseType.ERROR,
      message: "updateDataError",
      statusCode: 400
    }
  }

  // check item in user cart
  const updateItemRows = await Cart.getItem(itemId);
  if(updateItemRows.length == 0) {
    return  {
      type: ResponseType.ERROR,
      message: "itemUpdateNotFound",
      statusCode: 400
    }
  }

  // 4) If everything is OK, send data
  return {
    type: ResponseType.SUCCESS,
    message: 'successfulUpdateQuantityItem',
    statusCode: 200,
    item: updateItemRows[0]
  };
});