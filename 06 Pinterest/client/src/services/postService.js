import axios from "axios";
import api from "./api";

export const createPost = async (data) => {
  const token = localStorage.getItem("token");

  const res = await api.post("/post/create", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const getMyPosts = async () => {
  const token = localStorage.getItem("token");

  const res = await api.get("/post/mypost", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
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
  const token = localStorage.getItem("token");

  const res = await api.post(
    `/post/save/${postId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

export const deletePost = async (postId) => {
  const token = localStorage.getItem("token");

  const res = await api.delete(`/post/delete/${postId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
};

