import { userService } from "../services/index.js";
import catchAsync from "../utils/catchAsync.js";
import { ResponseType } from "../utils/constants.js";

/**
 * @desc  Get All Users Controllers
 * @param {Object} req - Request Object
 * @param {Object} res - Response Object
 * @property {String} req.query.sort - Sort returned data
 * @property {String} req.query.select - Select specific fields
 * @property {Number} req.query.page - Page number
 * @property {Number} req.query.limit - Maximum number of users in page
 * @returns {JSON} - A JSON object representing the type, message and users
*/
export const getUsers = catchAsync(async (req, res) => {
  let {page, sort, limit, select} = req.query;

  // setting default params
  if(!page) page = 1;
  if(!sort) sort = '';
  if(!limit) limit = 10;
  if(!select) select = '';

  // get all users
  const {type, message, statusCode, users} = await userService.queryUsers(req);

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
    users
  })
});