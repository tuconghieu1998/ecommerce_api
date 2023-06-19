import User from "../models/user.model.js";
import catchAsync from "../utils/catchAsync.js";
import { ResponseType } from "../utils/constants.js";

/**
 * @desc Query Users
 * @param {Object} req - Request Object
 * @returns {Object<type|message|statusCode|users>}
 * 
*/
export const queryUsers = catchAsync(async(req) => {
  const users = await User.getAllUsers();

  // check if users doesn't exist
  if(users.length === 0) {
    return {
      type: ResponseType.ERROR,
      message: "noUsersFound",
      statusCode: 404
    }
  }

  // if everything is OK, send data
  return {
    type: ResponseType.SUCCESS,
    message: 'successfulUsersFound',
    statusCode: 200,
    users     
  }
})

export const getProfile = catchAsync(async(user) => {
  const userRows = await User.getUserById(user.user_id);
  // check if users doesn't exist
  if(userRows.length === 0) {
    return {
      type: ResponseType.ERROR,
      message: "noUsersFound",
      statusCode: 404
    }
  }

  const profile = userRows[0];

  // if everything is OK, send data
  return {
    type: ResponseType.SUCCESS,
    message: 'successfulGetProfile',
    statusCode: 200,
    profile     
  }
})