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
