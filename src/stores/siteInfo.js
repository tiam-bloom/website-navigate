import { defineStore } from "pinia";
import { nanoid } from "nanoid";
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
    categories: new Set(siteInfoList.map(item => item.category))
  }),
  actions: {
    setSiteInfo(siteInfo) {
      return {
        id: nanoid(), // 网站id
        title: siteInfo.title, // 网站标题
        icon: siteInfo.icon, // 网站图标
        url: siteInfo.url, // 网站地址
        category: siteInfo.category, // 网站分类
        description: siteInfo.description, // 网站描述
      };
    },
  },
  getters: {
    // todo 添加分类筛选
    _siteInfoList: (state) => {
      let key = state.keywords.toLowerCase();
      let cate = state.category;
      // 屏蔽命令
      if(key.startsWith("/")) key = null
      if(cate === "index") cate = null
      // 为空时返回所有数据 
      if (!(key || cate) ) {
        return state.siteInfoList;
      }
      // 根据标题或描述搜索(不区分大小写)
      return state.siteInfoList.filter(
        (item) =>
          (key?item.title.toLowerCase().includes(key) || item.description.toLowerCase().includes(key):true) 
          &&
          (cate?item.category === cate:true)
      );
    },
  },
});
