import {baseApi} from './base';

export async function getUsers(options) {
  const res = await baseApi.get('users', options);
  return res.data;
}

export async function getUser(userId, options) {
  const res = await baseApi.get(`users/${userId}`, options);
  return res.data;
}
