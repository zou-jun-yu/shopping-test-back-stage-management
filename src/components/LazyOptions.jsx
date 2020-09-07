import React from "react";
import { Cascader } from "antd";
import PropTypes from "prop-types";

import { getSubCategoriesApi, cancelReq } from "../api";

//级联下拉选择框（懒加载）
export default class LazyOptions extends React.Component {
  static propTypes = {
    ancestorCategories: PropTypes.array,
    ancestorForest: PropTypes.array,
  };

  constructor(props) {
    super(props);
    this.state = {
      options: [],
      //下面这个属性是否存在决定了当前操作是增加商品还是修改商品
      ancestorCategoriesIds: this.props.ancestorCategories
        ? this.props.ancestorCategories.map((category) => category._id)
        : null,
    };
  }

  //重置级联选择输入框
  resetState = async () => {
    const options = await this.getSubOptions("0");
    this.setState({
      ancestorCategoriesIds: [],
      options: options,
    });
  };

  //向外暴露当前选中的分类
  provideAncestorCategories = () => this.state.ancestorCategoriesIds;

  //当前选中的分类改变时调用
  onChange = (value) => {
    this.setState({ ancestorCategoriesIds: value });
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

  initOptions = async () => {
    const { ancestorCategoriesIds } = this.state;
    if (!ancestorCategoriesIds) {
      //说明当前是在添加商品，只获取所有一级商品分类即可初始化级联选择框
      const options = await this.getSubOptions("0");
      this.setState({ options });
    } else {
      //说明当前正在修改商品，要把当前商品的祖先分类转化成数据源格式，然后渲染到级联选择输入框
      const { ancestorForest } = this.props;
      const options = ancestorForest.map((lv1Category) => ({
        value: lv1Category._id,
        label: lv1Category.categoryName,
        isLeaf: false,
      }));
      let targetOption = options.find(
        (option) => option.value === ancestorCategoriesIds[0]
      );
      targetOption.children = ancestorForest
        .filter((lv1Category) => lv1Category._id === ancestorCategoriesIds[0])[0]
        .children.map((lv2Category) => ({
          value: lv2Category._id,
          label: lv2Category.categoryName,
          isLeaf: false,
        }));

      targetOption = targetOption.children.find(
        (option) => option.value === ancestorCategoriesIds[1]
      );
      targetOption.children = ancestorForest
        .filter((lv1Category) => lv1Category._id === ancestorCategoriesIds[0])[0]
        .children.filter(
          (lv2Category) => lv2Category._id === ancestorCategoriesIds[1]
        )[0]
        .children.map((lv3Category) => ({
          value: lv3Category._id,
          label: lv3Category.categoryName,
          isLeaf: true,
        }));
      this.setState({ options });
    }
  };

  async componentDidMount() {
    this.initOptions();
  }

  componentWillUnmount() {
    cancelReq();
  }
  render() {
    const { ancestorCategoriesIds } = this.state;
    return (
      <Cascader
        options={this.state.options}
        loadData={this.loadData}
        onChange={this.onChange}
        defaultValue={ancestorCategoriesIds}
        changeOnSelect
      />
    );
  }
}
