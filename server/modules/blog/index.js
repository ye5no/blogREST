import Router from 'koa-router';
import controller from './controllers/blog-controller';
import getUser from '../../utils/getUser.js';
import { Blog } from './models';

const router = new Router({ prefix: '/blog' });

router
  .get('/getMessages', getUser(), controller.getMessages)
  .post('/createMessage', getUser(), controller.createMessage)
  .post('/editMessage', getUser(), controller.editMessage)
  ;

export default router.routes();

export {
  Blog,
};
