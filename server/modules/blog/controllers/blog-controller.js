import { Blog } from '../models';
import AppError from '../../../utils/AppErrors.js';

const getMessages = async (ctx) => {
  if (!ctx.user) throw new AppError(401, 101);
  const { page, pagesize } = ctx.query;
  let limit = 30;
  let skip = 0;
  if (Number.isInteger(Number(pagesize)) && Number(pagesize)>0) limit = Number(pagesize);
  if (Number.isInteger(Number(page)) && Number(page)>0) skip = (Number(page)-1)*limit;
  ctx.body = await Blog.find().skip(skip).limit(limit);
};

const createMessage = async (ctx) => {
  if (ctx.request.header['content-type'] != 'application/json' &&
    ctx.request.header['content-type'] != 'application/x-www-form-urlencoded') throw new AppError(400, 10);
  if (!ctx.user) throw new AppError(401, 101);
  if (!ctx.user.admin) throw new AppError(401, 105);
  if (!ctx.request.body.message) throw new AppError(406, 601);
  const { message } = ctx.request.body;
  ctx.body = await Blog.create({ message });
};

const editMessage = async (ctx) => {
  if (ctx.request.header['content-type'] != 'application/json' &&
    ctx.request.header['content-type'] != 'application/x-www-form-urlencoded') throw new AppError(400, 10);
  if (!ctx.user) throw new AppError(401, 101);
  if (!ctx.user.admin) throw new AppError(401, 105);
  if (!ctx.request.body.message || !ctx.request.body._id) throw new AppError(406, 601);
  const { message, _id } = ctx.request.body;
  ctx.body = await Blog.update({ _id }, { message });
};

export default {
  getMessages,
  createMessage,
  editMessage,
};
