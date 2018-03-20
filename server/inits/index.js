import { DIRS } from 'configuration';
import mongo from './stack/01-mongo';
import server from 'server';

export default async () => {
  return new Promise(async (resolve, reject) => {
    try {
      await mongo();
      resolve();
    } catch (e) {
      console.log(e);
      console.log('Server has been closed');
      server.close();
      reject();
    }
  });
};
