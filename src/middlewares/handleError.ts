import { ValidationError } from "express-validation";
import { Request, Response } from "express";

export = (error: unknown, req: Request, res: Response, next: unknown) => {
if (error instanceof ValidationError) {
    return res.status(error.statusCode).json(error);
}
return res.status(500).json(error)
}