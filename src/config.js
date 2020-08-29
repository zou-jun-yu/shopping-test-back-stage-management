//setupProxy.js文件中直接使用了http://localhost:5000而不是BASE_URL。
export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "http://47.115.157.0:5000"
    : "http://localhost:5000";
// export const BASE_URL = "http://localhost:5000";

export const IMAGES_DIR =
  process.env.NODE_ENV === "production"
    ? "http://47.115.157.0/images"
    : "http://47.115.157.0:5000/images/uploads/";
// export const IMAGES_DIR = "http://47.115.157.0:5000/images/uploads/";
