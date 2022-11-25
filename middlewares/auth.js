const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
require("dotenv").config();

export const isAuth = (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({ status: false, message: "Invalid Token" });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(402).send({ status: false, message: "No Token" });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role > 0) {
    next();
  } else {
    res.status(401).send({ status: false, message: "User Not Authorized" });
  }
};

export const isSuperAdmin = (req, res, next) => {
  if (req.user && req.user.role > 1) {
    next();
  } else {
    res.status(401).send({ status: false, message: "User Not Authorized" });
  }
};
