export const clickOneOfAncestorCategories = (
  category
) => ({
  type: "clickOneOfAncestorCategories",
  category,
});

export const pushCategory = (category) => ({
  type: "pushCategory",
  category,
});

export const getAncestorCategoriesFromGoodsDetail = (
  ancestorCategories
) => ({
  type: "getAncestorCategoriesFromGoodsDetail",
  ancestorCategories,
});
