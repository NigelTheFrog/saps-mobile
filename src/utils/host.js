import { store } from '../store';

const getHost = () => {
  return store.getState().system?.host || 'http://192.168.3.24';
};

export { getHost };
