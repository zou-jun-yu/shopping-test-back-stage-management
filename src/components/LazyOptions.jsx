import React from "react";
import { Cascader } from "antd";
import PropTypes from "prop-types";

import { getSubCategoriesApi } from "../api";

export default class LazyOptions extends React.Component {
  static propTypes = {
    goodsCategoryChainNodes: PropTypes.array,
    goodsCategoryOptions: PropTypes.array,
  };

  constructor(props) {
    super(props);
    this.state = {
      options: [],
      goodsCategoryChainNodesIds: this.props.goodsCategoryChainNodes
        ? this.props.goodsCategoryChainNodes.map((category) => category._id)
        : null,
    };
  }

  resetState = async () => {
    const levelOneOptions = await this.getSubOptions("0");
    this.setState({
      goodsCategoryChainNodesIds: [],
      options: levelOneOptions,
    });
  };

  provideGoodsCategoryChainNodes = () => this.state.goodsCategoryChainNodesIds;

  onChange = (value) => {
    this.setState({ goodsCategoryChainNodesIds: value });
  };

  loadData = async (selectedOptions) => {
    const length = selectedOptions.length;
    const targetOption = selectedOptions[length - 1];
    targetOption.loading = true;
    const subOptions = await this.getSubOptions(
      targetOption.value,
      length === 2
    );
    targetOption.loading = false;
    targetOption.children = subOptions;
    this.setState({
      options: [...this.state.options],
    });
  };

  getSubOptions = async (parentId, isLeaf = false) => {
    const result = await getSubCategoriesApi(parentId);
    const subCategories = result.data.subCategories;
    const subOptions = subCategories.map((category) => ({
      value: category._id,
      label: category.categoryName,
      isLeaf,
    }));
    return subOptions;
  };

  async componentDidMount() {
    const { goodsCategoryChainNodesIds } = this.state;
    if (!goodsCategoryChainNodesIds) {
      const levelOneOptions = await this.getSubOptions("0");
      this.setState({ options: levelOneOptions });
    } else {
      const { goodsCategoryOptions } = this.props;
      const levelOneOptions = goodsCategoryOptions.map((category1) => ({
        value: category1._id,
        label: category1.categoryName,
        isLeaf: false,
      }));
      let targetOption = levelOneOptions.find(
        (option) => option.value === goodsCategoryChainNodesIds[0]
      );
      targetOption.children = goodsCategoryOptions
        .filter(
          (category1) => category1._id === goodsCategoryChainNodesIds[0]
        )[0]
        .children.map((category2) => ({
          value: category2._id,
          label: category2.categoryName,
          isLeaf: false,
        }));

      targetOption = targetOption.children.find(
        (option) => option.value === goodsCategoryChainNodesIds[1]
      );
      targetOption.children = goodsCategoryOptions
        .filter(
          (category1) => category1._id === goodsCategoryChainNodesIds[0]
        )[0]
        .children.filter(
          (category2) => category2._id === goodsCategoryChainNodesIds[1]
        )[0]
        .children.map((category3) => ({
          value: category3._id,
          label: category3.categoryName,
          isLeaf: true,
        }));
      this.setState({ options: levelOneOptions });
    }
  }

  render() {
    const { goodsCategoryChainNodesIds } = this.state;
    return (
      <Cascader
        options={this.state.options}
        loadData={this.loadData}
        onChange={this.onChange}
        defaultValue={goodsCategoryChainNodesIds}
        changeOnSelect
      />
    );
  }
}
