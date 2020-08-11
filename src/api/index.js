import { post,get } from "./ajax";

export const loginApi = (user) => post("/api2/users/login", user);

export const getSubCategoriesApi = (parentId) => get("/api2/shopping/getSubCategories", { parentId });
export const deleteCategoryApi = (_id) => post("/api2/shopping/deleteCategory", {_id});
export const addOrUpdateCategoryApi = (category) => post("/api2/shopping/addOrUpdateCategory", category);

export const getGoodsListApi = (categoryId) => get("/api2/shopping/getGoodsList", { categoryId });
export const deleteManyGoodsApi = (deleteIdList) => post("/api2/shopping/deleteManyGoods", {deleteIdList});
export const addOrUpdateGoodsApi = (goods) => post("/api2/shopping/addOrUpdateGoods", goods);
export const getGoodsDetailApi = (_id) => get("/api2/shopping/getGoodsDetail", {_id});

export const deleteUploadImageApi = (imageName) => post("/api2/shopping/deleteUploadImage", {imageName});