import api from "./api";

export const registerUser = async (data) => {
  const res = await api.post("/user/register", data);
  return res.data;
};

export const loginUser = async (data) => {
  const res = await api.post("/user/login", data);
  return res.data;
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem("token");

  const res = await api.get("/user/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const logoutUser = async () => {
  const token = localStorage.getItem("token");
  const res = await api.get("/user/logout", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const getSavedPosts = async () => {
  const token = localStorage.getItem("token");

  const res = await api.get("/user/saved-posts", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
};
