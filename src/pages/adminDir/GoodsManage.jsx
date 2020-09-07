import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Card, Breadcrumb, Typography } from "antd";
import { connect } from "react-redux";

import Category from "./Category";
import GoodsList from "./GoodsList";
import GoodsDetail from "./GoodsDetail";
import { clickOneOfAncestorCategories } from "../../redux/actions";
// import { AncestorCategoriesContext } from "../../components/Reducer";
import CategoryManage from "../../components/CategoryManage";

const { Link } = Typography;

//商品和商品种类管理
function GoodsManage(props) {
  // const {
  //   ancestorCategories,
  //   ancestorCategoriesDispatch,
  // } = useContext(AncestorCategoriesContext);
  const { ancestorCategories, clickOneOfAncestorCategories } = props;

  return (
    <Card
      title={
        <Breadcrumb style={{ margin: "16px 0", fontSize: 16 }}>
          {ancestorCategories.map((category) => (
            <Breadcrumb.Item key={category._id}>
              <Link
                onClick={() => {
                  // ancestorCategoriesDispatch({
                  //   type: "clickOneOfAncestorCategories",
                  //   category,
                  // });
                  clickOneOfAncestorCategories(category);
                  props.history.push("/admin/goodsManage/category");
                }}
              >
                {category.categoryName}
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
  (state) => ({ ancestorCategories: state.ancestorCategories }),
  {
    clickOneOfAncestorCategories,
  }
)(GoodsManage);
