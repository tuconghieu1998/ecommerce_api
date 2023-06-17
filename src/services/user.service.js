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
    type: 'Success',
    message: 'successfulUsersFound',
    statusCode: 200,
    users     
  }
})