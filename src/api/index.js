import { post,get,cancelRequest } from "./ajax";

//登录接口
export const loginApi = (user) => post("/api2/users/login", user);

//分类接口
export const getSubCategoriesApi = (parentId) => get("/api2/shopping/getSubCategories", { parentId });
export const deleteCategoryApi = (_id) => post("/api2/shopping/deleteCategory", {_id});
export const addOrUpdateCategoryApi = (category) => post("/api2/shopping/addOrUpdateCategory", category);

//商品接口
export const getGoodsListApi = (categoryId) => get("/api2/shopping/getGoodsList", { categoryId });
export const deleteManyGoodsApi = (deleteIdList) => post("/api2/shopping/deleteManyGoods", {deleteIdList});
export const addOrUpdateGoodsApi = (goods) => post("/api2/shopping/addOrUpdateGoods", goods);
export const getGoodsDetailApi = (_id) => get("/api2/shopping/getGoodsDetail", {_id});

//删除上传过的图片
export const deleteUploadImageApi = (imageName) => post("/api2/shopping/deleteUploadImage", {imageName});

//用来取消ajax请求
export const cancelReq = cancelRequest;