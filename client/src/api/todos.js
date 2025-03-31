import {baseApi} from './base';

export async function getTodos(query, options) {
  const res = await baseApi.get(`/todos`, options);

  return res.data;
}
