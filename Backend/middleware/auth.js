import jwt from "jsonwebtoken";
import { createError } from "../utils/errorFiles.js";

export const verifyToken = async (req, res, next) => {
  const token = req.headers;

  if (!token) {
    throw {
      code: 401,
      name: "Unauthorized",
      message: "Token must provided",
    };
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) {
      throw {
        name: "Unauthorized",
        code: 401,
        message: "Invalid token or user",
      };
    }

    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized"));
    }
  });
};
