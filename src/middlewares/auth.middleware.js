import jwt from 'jsonwebtoken';
import { ResponseType } from '../utils/constants.js';

const config = process.env;

const verifyToken = (req, res, next) => {
  // get bearer token
  const bearerHeader = req.headers['authorization'];
  let bearerToken = null;
  if(typeof bearerHeader != 'undefined') {
    const bearer = bearerHeader.split(' ');
    bearerToken = bearer[1];
  }

  const token =
    req.body.token || req.query.token || req.headers["x-access-token"] || bearerToken;

  if (!token) {
    return res.status(403).json({
      type: ResponseType.ERROR,
      message: "A token is required for authentication"
    }).send();
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({
      type: ResponseType.ERROR,
      message: "Invalid Token"
    }).send();
  }
  return next();
};

export default verifyToken;