import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Card, Breadcrumb, Typography } from "antd";
import { connect } from "react-redux";

import Category from "./Category";
import GoodsList from "./GoodsList";
import GoodsDetail from "./GoodsDetail";
import { clickSelectedCategoryChainNode } from "../../redux/actions";
// import { selectedCategoryChainNodesContext } from "../../components/Reducer";
import CategoryManage from "../../components/CategoryManage";

const { Link } = Typography;

//商品和商品种类管理
function GoodsManage(props) {
  // const {
  //   selectedCategoryChainNodes,
  //   selectedCategoryChainNodesDispatch,
  // } = useContext(selectedCategoryChainNodesContext);
  const { selectedCategoryChainNodes, clickSelectedCategoryChainNode } = props;

  return (
    <Card
      title={
        <Breadcrumb style={{ margin: "16px 0", fontSize: 16 }}>
          {selectedCategoryChainNodes.map((selectedCategoryChainNode) => (
            <Breadcrumb.Item key={selectedCategoryChainNode._id}>
              <Link
                onClick={() => {
                  // selectedCategoryChainNodesDispatch({
                  //   type: "clickSelectedCategoryChainNode",
                  //   selectedCategoryChainNode,
                  // });
                  clickSelectedCategoryChainNode(selectedCategoryChainNode);
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

// export default GoodsManage;
export default connect(
  (state) => ({ selectedCategoryChainNodes: state.selectedCategoryChainNodes }),
  {
    clickSelectedCategoryChainNode,
  }
)(GoodsManage);
