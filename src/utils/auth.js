export const getToken = () => localStorage.getItem("token");
export const setToken = (token) => localStorage.setItem("token", token);
export const clearToken = () => localStorage.removeItem("token");
export const isLogin = () => !!localStorage.getItem("token");
