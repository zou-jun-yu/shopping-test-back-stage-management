import { createContext } from "react";

export const selectedCategoryChainNodesContext = createContext(null);

export const initSelectedCategoryChainNodes = [
  { _id: "0", categoryName: "一级分类列表", parentId: -1, _v: -1 },
];

export const reducer = (selectedCategoryChainNodes, action) => {
  switch (action.type) {
    case "clickSelectedCategoryChainNode":
      return selectedCategoryChainNodes.slice(0, selectedCategoryChainNodes.indexOf(action.selectedCategoryChainNode) + 1);
    case "pushSelectedCategoryChainNode":
      return [...selectedCategoryChainNodes, action.category];
    case "getSelectedCategoryChainNodesFromGoodsDetail":
      return [...initSelectedCategoryChainNodes, ...action.goodsCategoryChainNodes];
    default:
      throw new Error();
  }
};


