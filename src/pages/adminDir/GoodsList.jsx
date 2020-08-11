import React, { useState, useEffect, useContext, useCallback } from "react";
import { message, Button, Table, Tooltip } from "antd";

import { getGoodsListApi, deleteManyGoodsApi } from "../../api";
import { selectedCategoryChainNodesContext } from "../../components/Reducer";
import { BASE_URL } from "../../config";

function GoodsList(props) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);

  const { selectedCategoryChainNodes } = useContext(
    selectedCategoryChainNodesContext
  );
  const [goodsList, setGoodsList] = useState([]);

  const memoizedCallbackGetGoodsList = useCallback(() => {
    getGoodsListApi(
      selectedCategoryChainNodes[selectedCategoryChainNodes.length - 1]._id
    ).then(({ code, data, msg }) => {
      if (code === 0) {
        data.goodsList.forEach((goods) => {
          goods.key = goods._id;
        });
        setGoodsList(data.goodsList);
      } else {
        message.error(msg);
      }
    });
  }, [selectedCategoryChainNodes]);

  useEffect(() => {
    memoizedCallbackGetGoodsList();
  }, [memoizedCallbackGetGoodsList]);

  let titleMap = {},
    columns = [];
  if (goodsList.length) {
    titleMap = {
      goodsName: "商品名称",
      goodsDescription: "商品描述",
      marketPrice: "原价",
      nowPrice: "现价",
      goodsImages: "商品图片",
      goodsAmount: "库存量",
      salesNumber: "已售",
    };
    columns = Object.keys(titleMap).map((attrName) => {
      const config = {
        title: titleMap[attrName],
        key: attrName,
        dataIndex: attrName,
        ellipsis: {
          showTitle: false,
        },
      };
      if (attrName === "goodsImages") {
        return {
          ...config,
          width: 200,
          render: (attrValue) => (
            <Tooltip
              placement="left"
              title={attrValue.map((imageName) => (
                <img
                  src={BASE_URL + "/images/uploads/" + imageName}
                  alt="商品图片"
                  key={imageName}
                  style={{ height: 150, width: 150, margin: 4 }}
                />
              ))}
            >
              {attrValue.map((imageName) => (
                <img
                  src={BASE_URL + "/images/uploads/" + imageName}
                  alt="商品图片"
                  key={imageName}
                  style={{ height: 70, width: 70, marginRight: 2 }}
                />
              ))}
            </Tooltip>
          ),
        };
      } else {
        return {
          ...config,
          width: attrName === "goodsDescription" ? 300 : "auto",
          render: (attrValue) => (
            <Tooltip placement="topLeft" title={attrValue}>
              {attrValue}
            </Tooltip>
          ),
        };
      }
    });
    columns.push({
      title: "操作",
      key: "operation",
      render: (text, record, index) => {
        return (
          <div>
            <Button
              onClick={() => {
                props.history.push(
                  `/admin/goodsManage/goodsDetail/${record._id}`
                );
              }}
            >
              编辑
            </Button>
          </div>
        );
      },
    });
  }

  const start = async () => {
    setLoading(true);
    const result = await deleteManyGoodsApi(selectedRowKeys);
    const { code, msg, data } = result;
    if (code === 0) {
      console.log(data);
      message.success(msg);
      setSelectedRowKeys([]);
      memoizedCallbackGetGoodsList();
    } else {
      message.error(msg);
    }
    setLoading(false);
  };

  const onSelectChange = (selectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div>
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Button
            type="primary"
            onClick={start}
            disabled={!hasSelected}
            loading={loading}
          >
            删除选中商品
          </Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `已选中 ${selectedRowKeys.length} 种商品` : ""}
          </span>
        </div>
        <Button
          onClick={() => {
            props.history.push("/admin/goodsManage/goodsDetail");
          }}
        >
          添加商品
        </Button>
      </div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={goodsList}
        pagination={{
          defaultPageSize: 2,
        }}
      />
    </div>
  );
}

export default GoodsList;
