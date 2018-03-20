import passport from 'koa-passport';
import pick from 'lodash.pick';
import jwt from 'jsonwebtoken';
import AppError from '../../../utils/AppErrors.js';
import { JWT, ADDRESS } from 'configuration';
import { User } from '../models';

const setToken = (ctx, user) => {
  const payload = {
    _id: user._id,
    exp: Math.floor(Date.now() / 1000) + JWT.exp,
  };
  const token = jwt.sign(payload, JWT.secret);
  ctx.cookies.set('jwt', token, {httpOnly: true});
  return token;
};

const signup = async (ctx) => {
  if (ctx.request.header['content-type'] != 'application/json' &&
    ctx.request.header['content-type'] != 'application/x-www-form-urlencoded') throw new AppError(400, 10);
  if (ctx.user) throw new AppError(401, 102);

  const userData = pick(ctx.request.body, User.createFields);
  try {
    await User.create(userData);
  } catch (e) {
    const { message, errors, name } = e;
    throw (name == 'ValidationError') ? new AppError(400, message, errors) : e;
  }
  ctx.body = `user created`;
};

const login = async (ctx) => {
  if (ctx.request.header['content-type']!='application/json' &&
    ctx.request.header['content-type']!='application/x-www-form-urlencoded') throw new AppError(400, 10);
  if (ctx.user) throw new AppError(401, 102);

  const { email, password } = ctx.request.body;
  if (!email || !password) throw new AppError(406, 601);
  await passport.authenticate('local', (err, user) => {
    if (err) throw (err);
    if (!user) throw new AppError(401, 100);
    ctx.body = { data: setToken(ctx, user) };
  })(ctx);
};

const logout = async (ctx) => {
  if (!ctx.user) throw new AppError(401, 101);
  
  ctx.cookies.set('jwt', '', {httpOnly: true});
  ctx.headers.authorization = '';
  ctx.redirect('/');
};

export default {
  signup,
  login,
  logout,
};
