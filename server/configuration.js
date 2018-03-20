import config from 'config';

const ADDRESS = config.get('address');
const JWT = config.get('jwt');
const DIRS = config.get('dirs');
const MONGO_URI = config.get('mongoURI');


export {
  ADDRESS,
  JWT,
  DIRS,
  MONGO_URI,
};
