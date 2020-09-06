export const clickSelectedCategoryChainNode = (
  selectedCategoryChainNode
) => ({
  type: "clickSelectedCategoryChainNode",
  selectedCategoryChainNode,
});

export const pushSelectedCategoryChainNode = (category) => ({
  type: "pushSelectedCategoryChainNode",
  category,
});

export const getSelectedCategoryChainNodesFromGoodsDetail = (
  goodsCategoryChainNodes
) => ({
  type: "getSelectedCategoryChainNodesFromGoodsDetail",
  goodsCategoryChainNodes,
});
