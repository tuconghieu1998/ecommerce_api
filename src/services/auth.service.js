import catchAsync from "../utils/catchAsync.js";
import { ResponseType } from "../utils/constants.js";
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const registerUser = catchAsync(async(body) => {
  // get user input
  let {username, password, first_name, last_name, telephone} = body;
  //check params
  if(!(username && password && first_name && last_name)) {
    return {
      type: ResponseType.ERROR,
      message: "Invalid params",
      statusCode: 400
    }
  }
  if(!telephone) {
    telephone = ''; 
  }

  // check if user already exist
  const oldUserRows = await User.getUserByUsername(username);
  if(oldUserRows.length > 0) {
    return {
      type: ResponseType.ERROR,
      statusCode: 409,
      message: "usernameExist"
    }
  }

  // Encrypt user password
  const encryptedPassword = await bcrypt.hash(password, 10);

  // create user in database
  const result = await User.createUser({
    username: username.toLowerCase(),
    password: encryptedPassword,
    first_name,
    last_name,
    telephone
  });

  const userRows = await User.getUserById(result.insertId);
  if(userRows.length === 0) {
    return {
      type: ResponseType.ERROR,
      statusCode: 400,
      message: 'userCreateFail',
    }
  }
  const user = userRows[0];
  // create token
  const token = jwt.sign(
    {user_id: user.id, username},
    process.env.TOKEN_KEY,
    {
      expiresIn: "24h"
    }
  );
  // save user token
  user.token = token;
  // return new user
  return {
    type: ResponseType.SUCCESS,
    message: "successfulRegiterUser",
    statusCode: 201,
    user
  }
});

export const login = catchAsync(async(body) => {
  // get user input
  const {username, password} = body;
  //check params
  if(!(username && password)) {
    return {
      type: ResponseType.ERROR,
      message: "All input is required",
      statusCode: 404
    }
  }
 
  // validate if user exist in database
  const userRows = await User.getUserByUsername(username);
  if(userRows.length === 0) {
    return {
      type: ResponseType.ERROR,
      statusCode: 409,
      message: "Account doesn't exist"
    }
  }

  const user = userRows[0];
  // compare password
  if(!await bcrypt.compare(password, user.password)) {
    return {
      type: ResponseType.ERROR,
      statusCode: 409,
      message: "wrongPassword"
    }
  }

  // create token
  const token = jwt.sign(
    { user_id: user.id, username },
    process.env.TOKEN_KEY,
    {
      expiresIn: "24h",
    }
  );

  // save user token
  user.token = token;
  user.password = undefined;

  // return new user
  return {
    type: ResponseType.SUCCESS,
    message: "successfulLogin",
    statusCode: 200,
    user
  }
});