import {baseApi} from './base';

export async function getPosts(options) {
  const res = await baseApi.get('/posts', options);
  return res.data;
}

export async function getPost(postId, options) {
  const res = await baseApi.get(`/posts/${postId}`, options);
  return res.data;
}

export async function createPost(data, options) {
  const res = await baseApi.post('posts', data, options);
  return res.data;
}

export async function updatePost(postId, data, options) {
  const res = await baseApi.put(`posts/${postId}`, data, options);
  return res.data;
}
