import express from "express";

import userRoutes from "./user.routes";
import companyRoutes from "./company.routes";
import commentRoutes from "./comment.routes";
import authRoutes from "./auth.routes";
import contactRoutes from "./contact.routes";
import resetPasswordRoutes from "./reset-password.routes";

const routes = express.Router();

routes.use("/users", userRoutes);
routes.use("/companies", companyRoutes);
routes.use("/comments", commentRoutes);
routes.use("/login", authRoutes);
routes.use("/contacts", contactRoutes);
routes.use("/reset_password", resetPasswordRoutes);

export default routes;
