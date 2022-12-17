import express from 'express';
import CommentController from '../controllers/comment.controller';

const routes = express.Router();

const commentController = new CommentController();

routes.get('/', commentController.index);
routes.get('/:id', commentController.show);
routes.post('/', commentController.create);
routes.put('/:id', commentController.update);
routes.delete('/:id', commentController.delete);

export default routes;
