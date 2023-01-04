import express from 'express';

import userRoutes from './user.routes'
import companyRoutes from './company.routes'
import commentRoutes from './comment.routes'
import authRoutes from './auth.routes'

const routes = express.Router();

routes.use('/users', userRoutes);
routes.use('/companies', companyRoutes);
routes.use('/comments', commentRoutes);
routes.use("/login", authRoutes)

export default routes;