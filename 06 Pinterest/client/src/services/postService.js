import api from "./api";

export const createPost = async (data) => {
  const res = await api.post("/post/create", data);
  return res.data;
};

export const getMyPosts = async () => {
  const res = await api.get("/post/mypost");
  return res.data;
};

export const getAllPosts = async () => {
  const res = await api.get("/post/all");
  return res.data;
};

export const getSinglePost = async (id) => {
  const res = await api.get(`/post/${id}`);
  return res.data;
};

export const savePost = async (postId) => {
  const res = await api.post(`/post/save/${postId}`, {});
  return res.data;
};

export const deletePost = async (postId) => {
  const res = await api.delete(`/post/delete/${postId}`);
  return res.data;
};
