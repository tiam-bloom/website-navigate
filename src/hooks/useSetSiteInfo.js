import { nanoid } from "nanoid";

/**
 * 对用户未填写的信息进行补充
 * @param {object} siteInfo 
 * @returns 返回加工后的对象
 */
export default async function (siteInfo) {
  let t = "";
  if (!siteInfo.title || !siteInfo.description) await getTitle(siteInfo.url).then(title => t = title);
  return {
    id: nanoid(), // 网站id
    // 网站标题
    title: siteInfo.title || t,
    // 网站图标
    icon: siteInfo.icon || getFavicon(siteInfo.url),
    url: siteInfo.url, // 网站地址
    category: siteInfo.category, // 网站分类
    description: siteInfo.description || t, // 网站描述
  };
}
/**
 * 
 * @param {string} url 
 * @returns 返回网址标题
 */
function getTitle(url) {
  return new Promise((resolve, reject) => {
    fetch(`https://api.no0a.cn/api/sitetitle/query?url=${url}`)
      .then((resp) => resp.json())
      .then((data) => {
        // 返回网站标题
        resolve(data.title);
      });
  });
}
/**
 * 
 * @param {string} url 
 * @returns 根据网址获取其icon地址
 */
function getFavicon(url) {
  // 去除url中的http://或https://
  url = url.replace(/(^\w+:|^)\/\//, "");
  // 获取网站图标
  return `https://api.iowen.cn/favicon/${url}.png`;
}
