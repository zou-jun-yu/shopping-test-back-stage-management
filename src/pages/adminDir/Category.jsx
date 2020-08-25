import React, { useState, useEffect, useContext } from "react";
import { message, Card, Spin } from "antd";

import { getSubCategoriesApi, cancelReq } from "../../api";
import { selectedCategoryChainNodesContext } from "../../components/Reducer";
import { BASE_URL } from "../../config";

const { Meta } = Card;

function Category(props) {
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    selectedCategoryChainNodes,
    selectedCategoryChainNodesDispatch,
  } = useContext(selectedCategoryChainNodesContext);

  useEffect(() => {
    //一个有3个层级的分类，加上开头那个“一级分类列表”就是4个。当分类连长度达到4后，就该跳到商品列表页显示商品列表了。
    if (selectedCategoryChainNodes.length >= 4) {
      props.history.push("/admin/goodsManage/goodsList");
    } else {
      //获取分类链最后一个节点的所有子分类列表并把它们显示在页面上
      setLoading(true);
      getSubCategoriesApi(
        selectedCategoryChainNodes[selectedCategoryChainNodes.length - 1]._id
      ).then(({ code, data, msg }) => {
        setLoading(false);
        if (code === 0) {
          setSubCategories(data.subCategories);
        } else {
          message.error(msg);
        }
      });
    }
    return cancelReq;
  }, [selectedCategoryChainNodes, props.history]);

  return (
    <Spin spinning={loading} tip="Loading...">
      <div>
        {subCategories.map((category) => (
          <Card
            key={category._id}
            hoverable
            style={{ float: "left", padding: 10, margin: 10 }}
            bodyStyle={{ padding: 0 }}
            //如果subCategories是三级分类列表，则还要显示每一个分类的图片
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
                <span style={{ color: "#999999" }}>
                  {category.categoryName}
                </span>
              }
              style={{ textAlign: "center", width: 105 }}
            />
          </Card>
        ))}
      </div>
    </Spin>
  );
}

export default Category;
