import { NextFunction, Request, Response } from "express";

const jwt = require("jsonwebtoken");

export = (req: Request, res: Response, next: any) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token);
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decodedToken);
    const company = decodedToken.company;

    if (company) {
      req.params["company"] = company.id;

      next();
    } else {
      res.status(401).json({
        error: new Error("Invalid request!"),
      });
    }
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
