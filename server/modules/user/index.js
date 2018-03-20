import Router from 'koa-router';
import controller from './controllers/auth-controller';
import getUser from '../../utils/getUser.js';
import { User } from './models';

const router = new Router({ prefix: '/user' });

router
  .post('/signup', getUser(), controller.signup)
  .post('/login', getUser(), controller.login)
  .get('/logout', getUser(), controller.logout)
  ;

export default router.routes();

export {
  User,
};
