import Router from 'koa-router';
import user from './user';
import blog from './blog';
import { User } from './user';
import { Blog } from './blog';

const router = new Router({ prefix: '/api' });

router.use(user);
router.use(blog);

export default router.routes();

export {
  User,
  Blog,
};
