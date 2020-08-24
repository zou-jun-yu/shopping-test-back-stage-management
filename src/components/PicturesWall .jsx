import React from "react";
import { Upload, Modal, message } from "antd";
import PropTypes from "prop-types";
import { PlusOutlined } from "@ant-design/icons";

import { deleteUploadImageApi, cancelReq } from "../api";
import { BASE_URL } from "../config";

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
    const fileList = this.props.images.map((src, index) => ({
      uid: -index + "",
      name: src,
      status: "done",
      url: BASE_URL + "/images/uploads/" + src,
    }));
    this.state = { ...this.initState, fileList };
  }

  componentWillUnmount(){
    cancelReq();
  }

  resetState = () => {
    this.setState(this.initState);
  };

  getImgs = () => {
    return this.state.fileList.map((file) => file.name);
  };

  handleCancel = () => this.setState({ previewVisible: false });

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
