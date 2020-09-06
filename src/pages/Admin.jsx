import React from "react";
import { Layout, Menu } from "antd";
import { Switch, Route, Redirect, Link } from "react-router-dom";

import "./Admin.less";
import { adminRoutes } from "../routes";
import { getToken, clearToken } from "../utils/auth";
// import {
//   selectedCategoryChainNodesContext,
//   reducer,
//   initSelectedCategoryChainNodes,
// } from "../components/Reducer";

const { Header, Content, Sider } = Layout;

function Admin(props) {
  // const [
  //   selectedCategoryChainNodes,
  //   selectedCategoryChainNodesDispatch,
  // ] = useReducer(reducer, initSelectedCategoryChainNodes);

  return getToken() ? (
    <Layout className="layout">
      <Header className="header">
        电商网站后台管理系统
        <span
          onClick={() => {
            clearToken();
            props.history.push("/login");
          }}
        >
          退出登录
        </span>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            selectedKeys={[props.location.pathname.split("/")[2]]}
            style={{ height: "100%", borderRight: 0, fontSize: 20 }}
          >
            <Menu.Item key="goodsManage">
              <Link to="/admin/goodsManage">商品管理</Link>
            </Menu.Item>
            <Menu.Item key="order">
              <Link to="/admin/order">订单管理</Link>
            </Menu.Item>
            <Menu.Item key="userManage">
              <Link to="/admin/userManage">用户管理</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            className="site-layout-background content"
            style={{
              padding: 24,
              margin: 0,
              height: "100%",
            }}
          >
            {/* <selectedCategoryChainNodesContext.Provider
              value={{
                selectedCategoryChainNodes,
                selectedCategoryChainNodesDispatch,
              }}
            > */}
              <Switch>
                {adminRoutes.map((item) => (
                  <Route
                    path={item.path}
                    key={item.path}
                    component={item.component}
                  />
                ))}
                <Redirect to="/admin/goodsManage" />
              </Switch>
            {/* </selectedCategoryChainNodesContext.Provider> */}
            <footer className="footer"></footer>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  ) : (
    <Redirect to="/login" />
  );
}

export default Admin;

