import React, { useState, useEffect, useContext } from "react";
import { message, Card } from "antd";

import { getSubCategoriesApi } from "../../api";
import { selectedCategoryChainNodesContext } from "../../components/Reducer";
import { BASE_URL } from "../../config";

const { Meta } = Card;

function Category(props) {
  const [subCategories, setSubCategories] = useState([]);
  const {
    selectedCategoryChainNodes,
    selectedCategoryChainNodesDispatch,
  } = useContext(selectedCategoryChainNodesContext);

  useEffect(() => {
    if (selectedCategoryChainNodes.length >= 4) {
      props.history.push("/admin/goodsManage/goodsList");
    } else {
      getSubCategoriesApi(
        selectedCategoryChainNodes[selectedCategoryChainNodes.length - 1]._id
      ).then(({ code, data, msg }) => {
        if (code === 0) {
          setSubCategories(data.subCategories);
        } else {
          message.error(msg);
        }
      });
    }
  }, [selectedCategoryChainNodes, props.history]);

  return (
    <div>
      {subCategories.map((category) => (
        <Card
          key={category._id}
          hoverable
          style={{ float: "left", padding: 10, margin: 10 }}
          bodyStyle={{ padding: 0 }}
          cover={
            category.categoryImage ? (
              <img
                alt="商品分类图片"
                style={{ height: 105, width: 105 }}
                src={BASE_URL + "/images/uploads/" + category.categoryImage}
              />
            ) : null
          }
          onClick={() => {
            selectedCategoryChainNodesDispatch({
              type: "pushSelectedCategoryChainNode",
              category,
            });
          }}
        >
          <Meta
            title={
              <span style={{ color: "#999999" }}>{category.categoryName}</span>
            }
            style={{ textAlign: "center", width: 105 }}
          />
        </Card>
      ))}
    </div>
  );
}

export default Category;
