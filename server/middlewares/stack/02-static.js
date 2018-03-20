import serve from 'koa-static';
import path from 'path';
import {DIRS} from 'configuration';

export default (app) => {
  const publicDIR = path.resolve(__dirname, '../../../', DIRS.public);
  app.use(serve(publicDIR));
};
