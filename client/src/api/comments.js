import {baseApi} from './base';

export async function getComments(postId, options) {
  const res = await baseApi.get(`comments?postId=${postId}`, options);
  return res.data;
}
