import { NextFunction, Request, Response } from "express";

const jwt = require("jsonwebtoken");

module.exports = (req: any, res: any, next: any) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const company = decodedToken.company;

    if (company) {
      req["company"] = company;

      next();
    }

    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
