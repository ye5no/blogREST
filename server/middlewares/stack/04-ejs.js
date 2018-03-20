import render from 'koa-ejs';
import path from 'path';
import {DIRS} from 'configuration';

const publicDIR = path.resolve(__dirname, '../../../', DIRS.public);
const options = {
  root: publicDIR,
  layout: false,
  viewExt: 'ejs',
  cache: false,
  debug: false,
};

export default (app) => render(app, options);
