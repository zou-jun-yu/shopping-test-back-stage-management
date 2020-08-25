import { createContext } from "react";

//选中一个分类，接着选中它的子分类中的某一个，再选中它的下下级分类中的某一个...依次类推，将这几个选中的分类按顺序放在一个数组中，就形成了一个分类链。即某个分类跟它的所有祖先分类按顺序连在一起组成一个分类链。
export const selectedCategoryChainNodesContext = createContext(null);

//初始分类链，只有一个分类对象
export const initSelectedCategoryChainNodes = [
  { _id: "0", categoryName: "一级分类列表", parentId: -1, _v: -1 },
];

export const reducer = (selectedCategoryChainNodes, action) => {
  switch (action.type) {
    //点击分类链中的中间某一个时，会截断后面的
    case "clickSelectedCategoryChainNode":
      return selectedCategoryChainNodes.slice(
        0,
        selectedCategoryChainNodes.indexOf(action.selectedCategoryChainNode) + 1
      );
    //点击分类列表中的某个分类时，会将该分类加到分类链末端
    case "pushSelectedCategoryChainNode":
      return [...selectedCategoryChainNodes, action.category];
    //根据某个商品获取它的所有祖先串起来就得到一个分类链
    case "getSelectedCategoryChainNodesFromGoodsDetail":
      return [
        ...initSelectedCategoryChainNodes,
        ...action.goodsCategoryChainNodes,
      ];
    default:
      throw new Error();
  }
};


