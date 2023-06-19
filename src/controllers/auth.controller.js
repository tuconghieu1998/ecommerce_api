import { authService } from "../services/index.js";
import catchAsync from "../utils/catchAsync.js";
import { ResponseType } from "../utils/constants.js";

export const registerUser = catchAsync(async (req, res) => {
  console.log("registerUser", req.body);
  const {type, message, statusCode, user} = await authService.registerUser(req.body);

  if(type === ResponseType.ERROR) {
    return res.status(statusCode).json({
      type,
      message
    })
  }

  return res.status(statusCode).json({
    type,
    message,
    user
  });
});

export const login = catchAsync(async (req, res) => {
  console.log("login", req.body);
  const {type, message, statusCode, user} = await authService.login(req.body);

  if(type === ResponseType.ERROR) {
    return res.status(statusCode).json({
      type,
      message
    })
  }

  return res.status(statusCode).json({
    type,
    message,
    user
  });
});