import React from "react";
import { Upload, Modal, message } from "antd";
import PropTypes from "prop-types";
import { PlusOutlined } from "@ant-design/icons";

import { deleteUploadImageApi, cancelReq } from "../api";
import {  IMAGES_DIR } from "../config";

//图片上传组件
export default class PicturesWall extends React.Component {
  static propTypes = {
    images: PropTypes.array,
    maxNumber: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.initState = {
      previewVisible: false,
      previewImage: "",
      previewTitle: "",
      fileList: [],
    };
    //初始化显示是否已经上传果图片
    const fileList = this.props.images.map((src, index) => ({
      uid: -index + "",
      name: src,
      status: "done",
      url: IMAGES_DIR + src,
    }));
    this.state = { ...this.initState, fileList };
  }

  //跳转到其它页面时，取消ajax请求
  componentWillUnmount(){
    cancelReq();
  }

  resetState = () => {
    this.setState(this.initState);
  };

  //向往提供当前商品上传了哪些图片的信息
  getImgs = () => {
    return this.state.fileList.map((file) => file.name);
  };

  //隐藏预览大图模态窗
  handleCancel = () => this.setState({ previewVisible: false });

  //显示大图预览
  handlePreview = async (file) => {
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  handleChange = async ({ fileList, file }) => {
    if (file.status === "done") {
      //当成功上传图片时，更新图片列表
      const result = file.response;
      if (result.code === 0) {
        message.success(result.msg);
        const src = result.data.src;
        const image = fileList[fileList.length - 1];
        image.url = src;
        image.name = image.url.substring(image.url.lastIndexOf("/") + 1);
      } else {
        message.error(result.msg);
      }
    } else if (file.status === "removed") {
      //删除上传的图片
      const result = await deleteUploadImageApi(file.name);
      if (result.code === 0) {
        message.success(result.msg);
      } else {
        message.error(result.msg);
      }
    }
    this.setState({ fileList });
  };

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="/api2/shopping/uploadImage"
          listType="picture-card"
          fileList={fileList}
          accept="image/*"
          name="goods"
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= (this.props.maxNumber || 5) ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="商品图片" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
