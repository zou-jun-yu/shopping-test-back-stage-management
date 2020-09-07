// import { createContext } from "react";

// //选中一个分类，接着选中它的子分类中的某一个，再选中它的下下级分类中的某一个...依次类推，将这几个选中的分类按顺序放在一个数组中，就形成了一个祖先链。即某个分类跟它的所有祖先分类按顺序连在一起组成一个祖先链。
// export const AncestorCategoriesContext = createContext(null);

// //初始祖先链，只有一个分类对象
// export const initAncestorCategories = [
//   { _id: "0", categoryName: "一级分类列表", parentId: -1, _v: -1 },
// ];

// export const reducer = (ancestorCategories, action) => {
//   switch (action.type) {
//     //点击祖先链中的中间某一个时，会截断后面的
//     case "clickOneOfAncestorCategories":
//       return ancestorCategories.slice(
//         0,
//         ancestorCategories.indexOf(action.category) + 1
//       );
//     //点击分类列表中的某个分类时，会将该分类加到祖先链末端
//     case "pushCategory":
//       return [...ancestorCategories, action.category];
//     //根据某个商品获取它的所有祖先串起来就得到一个祖先链
//     case "getAncestorCategoriesFromGoodsDetail":
//       return [
//         ...initAncestorCategories,
//         ...action.ancestorCategories,
//       ];
//     default:
//       throw new Error();
//   }
// };


