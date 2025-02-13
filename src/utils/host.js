import { store } from '../store';

const getHost = () => {
  return store.getState().system?.host || 'http://192.168.88.56/saps-sso-bpn/public';
};

export { getHost };
