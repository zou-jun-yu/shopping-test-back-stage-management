import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Card, Breadcrumb, Typography } from "antd";

import Category from "./Category";
import GoodsList from "./GoodsList";
import GoodsDetail from "./GoodsDetail";
import { selectedCategoryChainNodesContext } from "../../components/Reducer";
import CategoryManage from "../../components/CategoryManage";

const { Link } = Typography;

function GoodsManage(props) {
  const {
    selectedCategoryChainNodes,
    selectedCategoryChainNodesDispatch,
  } = useContext(selectedCategoryChainNodesContext);

  return (
    <Card
      title={
        <Breadcrumb style={{ margin: "16px 0", fontSize: 16 }}>
          {selectedCategoryChainNodes.map((selectedCategoryChainNode) => (
            <Breadcrumb.Item key={selectedCategoryChainNode._id}>
              <Link
                onClick={() => {
                  selectedCategoryChainNodesDispatch({
                    type: "clickSelectedCategoryChainNode",
                    selectedCategoryChainNode,
                  });
                  props.history.push("/admin/goodsManage/category");
                }}
              >
                {selectedCategoryChainNode.categoryName}
              </Link>
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
      }
      bordered={false}
      extra={<CategoryManage />}
      style={{ height: "100%", overflow: "auto" }}
      headStyle={{ fontSize: 20 }}
    >
      <Switch>
        <Route
          path="/admin/goodsManage/category"
          render={(routeProps) => <Category {...routeProps} />}
        />
        <Route
          path="/admin/goodsManage/goodsList"
          render={(routeProps) => <GoodsList {...routeProps} />}
        />
        <Route
          path="/admin/goodsManage/goodsDetail"
          exact={true}
          render={(routeProps) => <GoodsDetail {...routeProps} />}
        />
        <Route
          path="/admin/goodsManage/goodsDetail/:id"
          render={(routeProps) => <GoodsDetail {...routeProps} />}
        />
        <Redirect to="/admin/goodsManage/category" />
      </Switch>
    </Card>
  );
}

export default GoodsManage;
