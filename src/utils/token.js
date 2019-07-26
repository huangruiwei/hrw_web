import md5 from 'md5';

const salt = 'hrw-Admin';
const tokenKey = md5(salt + '-token');

export function getToken() {
  return sessionStorage.getItem(tokenKey);
}

export function setToken(token) {
  sessionStorage.setItem(tokenKey, token);
}

export function removeToken() {
  sessionStorage.removeItem(tokenKey);
}
