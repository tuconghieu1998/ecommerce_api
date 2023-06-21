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
  let itemId;
  // find item is added to cart => if yes -> add quantity
  const itemRows = await Cart.getItemByUserAndProductId(user.user_id, product_id);
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
    itemId = cartItem.id;
  }
  else {
    const resultCreate = await Cart.addItem(user.user_id, product_id, quantity);
    itemId = resultCreate.insertId;
  }

  const createItemRows = await Cart.getItem(itemId);
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
    item: createItemRows[0]
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
    items: itemRows
  };
});