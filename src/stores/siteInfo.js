import { defineStore } from "pinia";
import { nanoid } from "nanoid";
import siteInfoList from "@/data/siteInfoList.json";
import axios from "axios";

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
  actions: {
    async setSiteInfo(siteInfo) {
      let t = "";
      if (!siteInfo.title || !siteInfo.description) {
        t = await this.getTitle(siteInfo.url);
      }
      return {
        id: nanoid(), // 网站id
        // 网站标题
        title: siteInfo.title || t,
        // 网站图标
        icon: siteInfo.icon || this.getFavicon(siteInfo.url),
        url: siteInfo.url, // 网站地址
        category: siteInfo.category, // 网站分类
        description: siteInfo.description || t, // 网站描述
      };
    },
    // google 上网有限制
    getFavicon2(url) {
      // 获取网站图标
      return `https://www.google.com/s2/favicons?domain=${url}`;
    },
    async getFavicon1(url) {
      // 去除url中的http://或https://
      url = url.replace(/(^\w+:|^)\/\//, "");
      // 获取网站图标 有跨域问题
      return await axios
        .get(`https://api.iowen.cn/favicon/${url}.png`, {
          // 请求头, 伪装成浏览器, 解决跨域问题
          headers: {
            // 跨域问题
            "Access-Control-Allow-Origin": "*",
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36",
          },
        })
        .then((res) => {
          console.log(res);
          return res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getTitle(url) {
      return new Promise((resolve, reject) => {
        fetch(`https://api.no0a.cn/api/sitetitle/query?url=${url}`)
          .then((resp) => resp.json())
          .then((data) => {
            // 返回网站标题
            resolve(data.title);
          });
      });
    },
    // 获取网站图标
    getFavicon(url) {
      // 去除url中的http://或https://
      url = url.replace(/(^\w+:|^)\/\//, "");
      // 获取网站图标
      return `https://api.iowen.cn/favicon/${url}.png`;
    },
    // 获取网站标题--> 有跨域问题
    async getTitle1(url) {
      // 获取网站标题
      await fetch(url)
        .then((res) => res.text())
        .then((html) => {
          const title = html.match(/<title>(.*?)<\/title>/);
          console.log(title);
          return title ? title[1] : "";
        });
    },

  },
  getters: {
    // todo 添加分类筛选
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
