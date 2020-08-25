import React from "react";
import { Cascader } from "antd";
import PropTypes from "prop-types";

import { getSubCategoriesApi,cancelReq } from "../api";

//级联下拉选择框（懒加载）
export default class LazyOptions extends React.Component {
  static propTypes = {
    goodsCategoryChainNodes: PropTypes.array,
    goodsCategoryOptions: PropTypes.array,
  };

  constructor(props) {
    super(props);
    this.state = {
      options: [],
      //下面这个属性是否存在决定了当前操作是增加商品还是修改商品
      goodsCategoryChainNodesIds: this.props.goodsCategoryChainNodes
        ? this.props.goodsCategoryChainNodes.map((category) => category._id)
        : null,
    };
  }

  //重置级联选择输入框
  resetState = async () => {
    const levelOneOptions = await this.getSubOptions("0");
    this.setState({
      goodsCategoryChainNodesIds: [],
      options: levelOneOptions,
    });
  };

  //向外暴露当前选中的分类
  provideGoodsCategoryChainNodes = () => this.state.goodsCategoryChainNodesIds;

  //当前选中的分类改变时调用
  onChange = (value) => {
    this.setState({ goodsCategoryChainNodesIds: value });
  };

  //当选择某个分类时，加载它的子分类列表
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

  //请求一个分类的子分类列表，并将结果转化成级联选择框的数据源
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
      //说明当前是在添加商品，只获取所有一级商品分类即可初始化级联选择框
      const levelOneOptions = await this.getSubOptions("0");
      this.setState({ options: levelOneOptions });
    } else {
      //说明当前正在修改商品，要把当前商品的祖先分类转化成数据源格式，然后渲染到级联选择输入框
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

  componentWillUnmount(){
    cancelReq();
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
