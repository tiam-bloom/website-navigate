import { defineStore } from "pinia";
import siteInfoList from "@/data/siteInfoList.json";

export const useSiteStore = defineStore("siteInfo", {
  state: () => ({
    // 获取json文件中的数据
    siteInfoList,
    // 搜索关键字
    keywords: "",
    // 当前分类
    category: "",
    // 获取分类信息
    categories: new Set(siteInfoList.map((item) => item.category)),
  }),
  actions: {},
  getters: {
    /**
     * 根据关键字和分类筛选数据(搜索)
     * @param {state} state
     * @returns
     */
    _siteInfoList: (state) => {
      let key = state.keywords.toLowerCase();
      let cate = state.category;
      // 屏蔽命令
      if (key.startsWith("/")) key = null;
      if (cate === "index") cate = null;
      // 为空时返回所有数据
      if (!(key || cate)) {
        return state.siteInfoList;
      }
      // 根据标题或描述搜索(不区分大小写)
      return state.siteInfoList.filter(
        // todo description 或 title 为空会异常
        (item) =>
          (key
            ? item.title.toLowerCase().includes(key) ||
              item.description.toLowerCase().includes(key)
            : true) && (cate ? item.category === cate : true)
      );
    },
  },
});
