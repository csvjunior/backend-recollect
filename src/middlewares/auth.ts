import { NextFunction, Request, Response } from "express";
import MESSAGE from "../constants/messages";

const jwt = require("jsonwebtoken");

export = (req: Request, res: Response, next: any) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const company = decodedToken.company;

    if (company) {
      req.params["id"] = company.id;

      next();
    } else {
      res.status(401).json({
        error: new Error(MESSAGE.ERROR.INVALID_REQUEST),
      });
    }
  } catch {
    res.status(401).json({
      error: new Error(MESSAGE.ERROR.INVALID_REQUEST),
    });
  }
};
