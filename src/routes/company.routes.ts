import express from 'express';
import CompanyController from '../controllers/company.controller';

const routes = express.Router();

const companyController = new CompanyController();

routes.get('/', companyController.index);
routes.get('/:id', companyController.show);
routes.post('/', companyController.create);
routes.put('/:id', companyController.update);
routes.delete('/:id', companyController.delete);

export default routes;
