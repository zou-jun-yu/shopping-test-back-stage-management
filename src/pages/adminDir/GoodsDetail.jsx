import React, { useRef, useEffect, useState, useContext } from "react";
import { Form, Input, Button, message } from "antd";

import PicturesWall from "../../components/PicturesWall ";
import LazyOptions from "../../components/LazyOptions";
import { addOrUpdateGoodsApi, getGoodsDetailApi } from "../../api";
import { selectedCategoryChainNodesContext } from "../../components/Reducer";

import "./GoodsDetail.less";

function GoodsDetail(props) {
  const [form] = Form.useForm();
  const picturesWallRef = useRef(null);
  const lazyOptionsRef = useRef(null);

  const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 12,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 4,
      span: 12,
    },
  };

  const [goodsDetail, setGoodsDetail] = useState(null);
  const { selectedCategoryChainNodesDispatch } = useContext(
    selectedCategoryChainNodesContext
  );
  useEffect(() => {
    const _id = props.match.params.id;
    if (_id) {
      getGoodsDetailApi(_id).then((result) => {
        const { code, msg, data } = result;
        if (code === 0) {
          setGoodsDetail({
            ...data.goodsDetail,
            goodsCategoryChainNodes: data.goodsCategoryChainNodes,
            goodsCategoryOptions: data.goodsCategoryOptions,
          });
          selectedCategoryChainNodesDispatch({
            type: "getSelectedCategoryChainNodesFromGoodsDetail",
            goodsCategoryChainNodes: data.goodsCategoryChainNodes,
          });
        } else {
          message.error(msg);
        }
      });
    }
  }, [props.match.params.id, selectedCategoryChainNodesDispatch]);

  const onReset = () => {
    form.setFieldsValue({
      goodsName: "",
      goodsDescription: "",
      marketPrice: undefined,
      nowPrice: undefined,
      goodsAmount: undefined,
    });
    lazyOptionsRef.current.resetState();
    picturesWallRef.current.resetState();
  };

  const onFinish = async (values) => {
    values.marketPrice *= 1;
    values.nowPrice *= 1;
    let goods = {
      ...values,
      categoryId: lazyOptionsRef.current.provideGoodsCategoryChainNodes().pop(),
      goodsImages: picturesWallRef.current.getImgs(),
    };
    if (props.match.params.id) {
      goods._id = props.match.params.id;
    }
    const result = await addOrUpdateGoodsApi(goods);
    if (result.code === 0) {
      message.success(result.msg);
      onReset();
    } else {
      message.error(result.msg);
    }
  };

  const onFinishFailed = (errorInfo) => {
    message.error("保存商品失败");
  };

  return goodsDetail || !props.match.params.id ? (
    <Form
      {...layout}
      name="basic"
      form={form}
      initialValues={
        goodsDetail
          ? {
              goodsName: goodsDetail.goodsName,
              goodsDescription: goodsDetail.goodsDescription,
              marketPrice: goodsDetail.marketPrice,
              nowPrice: goodsDetail.nowPrice,
              goodsAmount: goodsDetail.goodsAmount,
            }
          : {}
      }
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="商品分类"
        rules={[{ required: true, message: "请选择商品分类" }]}
      >
        <LazyOptions
          ref={lazyOptionsRef}
          goodsCategoryChainNodes={
            goodsDetail ? goodsDetail.goodsCategoryChainNodes : null
          }
          goodsCategoryOptions={
            goodsDetail ? goodsDetail.goodsCategoryOptions : null
          }
        />
      </Form.Item>
      <Form.Item
        label="商品名称 "
        name="goodsName"
        rules={[{ required: true, message: "请选请输入商品名称" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="商品描述" name="goodsDescription">
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        label="原价"
        name="marketPrice"
        rules={[{ required: true, message: "请选请输入商品原价" }]}
      >
        <Input type="number" addonAfter="元" />
      </Form.Item>
      <Form.Item
        label="现价"
        name="nowPrice"
        rules={[{ required: true, message: "请选请输入商品现价" }]}
      >
        <Input type="number" addonAfter="元" />
      </Form.Item>
      <Form.Item
        label="商品数量"
        name="goodsAmount"
        rules={[{ required: true, message: "请输入此商品的数量" }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item label="上传图片">
        <PicturesWall
          ref={picturesWallRef}
          images={goodsDetail ? goodsDetail.goodsImages : []}
        />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          保存
        </Button>
        <Button htmlType="button" onClick={onReset}>
          清空
        </Button>
      </Form.Item>
    </Form>
  ) : (
    "Loading..."
  );
}

export default GoodsDetail;
