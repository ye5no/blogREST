import favicon from 'koa-favicon';
import path from 'path';
import {DIRS} from 'configuration';

export default (app) => {
  const publicDIR = path.resolve(__dirname, '../../../', DIRS.public);
  app.use(favicon(publicDIR + '/favicon.png'));
};
