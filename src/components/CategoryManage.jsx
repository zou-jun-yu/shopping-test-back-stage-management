import React, { useContext, useState, useEffect, useRef } from "react";
import { Input, message, Modal, Row, Col, Space, Typography } from "antd";
import { withRouter } from "react-router-dom";

import {
  addOrUpdateCategoryApi,
  deleteCategoryApi,
  deleteUploadImageApi,
} from "../api";
import PicturesWall from "./PicturesWall ";
import { selectedCategoryChainNodesContext } from "./Reducer";

const { Link } = Typography;

const CategoryManage = (props) => {
  const picturesWallAddRef = useRef(null);
  const picturesWallUpdateRef = useRef(null);

  const [modalState, setModalState] = useState({
    ModalTitle: "",
    visible: false,
    confirmLoading: false,
  });

  const {
    selectedCategoryChainNodes,
    selectedCategoryChainNodesDispatch,
  } = useContext(selectedCategoryChainNodesContext);
  const currentCategory =
    selectedCategoryChainNodes[selectedCategoryChainNodes.length - 1];
  const [categoryName, setCategoryName] = useState(
    currentCategory.categoryName
  );

  useEffect(() => {
    setCategoryName(currentCategory.categoryName);
  }, [currentCategory.categoryName]);

  const showModal = (operationType) => {
    setModalState({
      ModalTitle: operationType,
      visible: true,
      confirmLoading: false,
    });
    if (operationType === "添加分类") {
      setCategoryName("");
    }
  };

  const handleOk = async () => {
    setModalState((modalState) => ({
      ...modalState,
      confirmLoading: true,
    }));
    let result, deleteImageResult;
    switch (modalState.ModalTitle) {
      case "修改分类":
        const categoryAfterUpdate = {
          ...currentCategory,
          categoryName,
        };
        if (picturesWallUpdateRef.current.getImgs().length) {
          categoryAfterUpdate.categoryImage = picturesWallUpdateRef.current.getImgs()[0];
        } else {
          delete categoryAfterUpdate.categoryImage;
        }
        result = await addOrUpdateCategoryApi(categoryAfterUpdate);
        break;
      case "删除分类":
        if (currentCategory.categoryImage) {
          deleteImageResult = await deleteUploadImageApi(
            currentCategory.categoryImage
          );
        }
        result = await deleteCategoryApi(currentCategory._id);
        if (deleteImageResult && deleteImageResult.code !== 0) {
          result = deleteImageResult;
        }
        break;
      case "添加分类":
        const newCategory = {
          parentId: currentCategory._id,
          categoryName,
        };
        if (picturesWallAddRef.current.getImgs().length) {
          newCategory.categoryImage = picturesWallAddRef.current.getImgs()[0];
        }
        result = await addOrUpdateCategoryApi(newCategory);
        break;
      default:
        throw new Error("操作类型错误");
    }
    const { code, msg } = result;
    if (code === 0) {
      message.success(msg);
    } else {
      message.error(msg);
    }
    setModalState({
      ModalTitle: "",
      visible: false,
      confirmLoading: false,
    });
    selectedCategoryChainNodesDispatch({
      type: "clickSelectedCategoryChainNode",
      selectedCategoryChainNode: selectedCategoryChainNodes[0],
    });
    props.history.push("/admin/goodsManage/category");
  };

  const handleCancel = () => {
    setModalState({
      ModalTitle: "",
      visible: false,
      confirmLoading: false,
    });
    setCategoryName(currentCategory.categoryName);
  };

  const { visible, confirmLoading, ModalTitle } = modalState;

  return (
    <div style={{ fontSize: 16 }}>
      <Space size={50}>
        {selectedCategoryChainNodes.length < 4 ? (
          <Link onClick={() => showModal("添加分类")}>添加分类</Link>
        ) : null}
        {selectedCategoryChainNodes.length > 1 ? (
          <>
            <Link onClick={() => showModal("修改分类")}>修改分类</Link>
            <Link onClick={() => showModal("删除分类")}>删除分类</Link>
          </>
        ) : null}
      </Space>
      <Modal
        title={ModalTitle}
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText="确认"
        cancelText="取消"
      >
        {ModalTitle === "修改分类" ? (
          <>
            <Row justify="space-around" align="middle" gutter={[10, 30]}>
              <Col span={4}>分类名称：</Col>
              <Col span={20}>
                <Input
                  value={categoryName}
                  onChange={(e) => {
                    setCategoryName(e.target.value);
                  }}
                />
              </Col>
            </Row>
            {currentCategory.categoryImage ? (
              <Row gutter={[10, 30]}>
                <Col offset={4}>
                  <PicturesWall
                    ref={picturesWallUpdateRef}
                    images={[currentCategory.categoryImage]}
                    maxNumber={1}
                  />
                </Col>
              </Row>
            ) : null}
          </>
        ) : ModalTitle === "删除分类" ? (
          <Row justify="space-around" align="middle" gutter={[10, 30]}>
            <Col span={6}>确认删除分类:</Col>
            <Col span={16}>{currentCategory.categoryName}？</Col>
          </Row>
        ) : (
          <>
            <Row justify="space-around" align="middle" gutter={[10, 30]}>
              <Col span={4}>上级分类：</Col>
              <Col span={20}>
                {selectedCategoryChainNodes.map(
                  (selectedCategoryChainNode) =>
                    " / " + selectedCategoryChainNode.categoryName
                )}
              </Col>
            </Row>
            <Row justify="space-around" align="middle" gutter={[10, 30]}>
              <Col span={4}>分类名称：</Col>
              <Col span={20}>
                <Input
                  value={categoryName}
                  onChange={(e) => {
                    setCategoryName(e.target.value);
                  }}
                />
              </Col>
            </Row>
            {selectedCategoryChainNodes.length === 3 ? (
              <Row gutter={[10, 30]}>
                <Col offset={4}>
                  <PicturesWall
                    ref={picturesWallAddRef}
                    maxNumber={1}
                    images={[]}
                  />
                </Col>
              </Row>
            ) : null}
          </>
        )}
      </Modal>
    </div>
  );
};

export default withRouter(CategoryManage);
