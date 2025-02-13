import { store } from '../store';

export class Fetch {
  getBaseUrl() {
    return (store.getState().system?.host || 'http://192.168.88.56/saps-sso-bpn/public') + '/api';
  }

  addTokenToHeader(plain) {
    const token = store.getState().auth?.token;

    if (token) {
      return Object.assign(plain, {
        authorization: `Bearer ${token}`,
      });
    }
    return plain;
  }

  genHeader() {
    const plain = {
      accept: 'application/json',
      'content-type': 'application/json',
    };

    return this.addTokenToHeader(plain);
  }

  async post(path, body) {
    console.log(
      `RQ: ${this.getBaseUrl()}${path} body: ${JSON.stringify(body)}`,
    );

    const payload = {
      method: 'POST',
      headers: this.genHeader(),
      body: JSON.stringify(body ?? {}),
    };

    return fetch(`${this.getBaseUrl()}${path}`, payload);
  }

  async put(path, body) {
    const payload = {
      method: 'PUT',
      headers: this.genHeader(),
      body: JSON.stringify(body ?? {}),
    };

    return fetch(`${this.getBaseUrl()}${path}`, payload);
  }

  async upload(path, data) {
    const payload = {
      method: 'PUT',
      headers: this.addTokenToHeader({}),
      body: data,
    };

    return fetch(`${this.getBaseUrl()}${path}`, payload);
  }

  async get(path) {
    return fetch(`${this.getBaseUrl()}${path}`, {
      headers: this.genHeader(),
    });
  }

  async checkConnection() {
    return fetch(`${this.getBaseUrl()}`)
  }

  async delete(path) {
    return fetch(`${this.getBaseUrl()}${path}`, {
      method: 'DELETE',
      headers: this.genHeader(),
    });
  }
}

export default new Fetch();