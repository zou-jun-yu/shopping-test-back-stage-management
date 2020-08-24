import React, { useEffect } from "react";
import { Form, Input, Button, Modal } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import "./Login.less";
import { loginApi, cancelReq } from "../api";
import { setToken } from "../utils/auth";

function Login(props) {
  const onFinish = async (user) => {
    const { status, data, msg } = await loginApi(user);
    if (status === 0) {
      setToken(data.token);
      props.history.push("/admin");
    } else {
      Modal.error({ title: msg });
    }
  };
  useEffect(() => {
    return cancelReq;
  });
  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ username: "admin" }}
      onFinish={onFinish}
    >
      <h2>用户登录</h2>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "请输入您的用户名!" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="用户名"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "请输入您的密码!" }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="密码"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          登录
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Login;
