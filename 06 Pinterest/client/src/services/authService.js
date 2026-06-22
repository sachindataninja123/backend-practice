import api from "./api";

export const registerUser = async (data) => {
  const res = await api.post("/user/register", data);
  return res.data;
};

export const loginUser = async (data) => {
  const res = await api.post("/user/login", data);
  localStorage.setItem("token", res.data.accessToken); 
  return res.data;
};

export const getCurrentUser = async () => {
  const res = await api.get("/user/profile");
  return res.data;
};

export const logoutUser = async () => {
  const res = await api.get("/user/logout");
  localStorage.removeItem("token"); 
  return res.data;
};

export const getSavedPosts = async () => {
  const res = await api.get("/user/saved-posts");
  return res.data;
};
