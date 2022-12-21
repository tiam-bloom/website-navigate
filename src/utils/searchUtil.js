import algoliasearch from 'algoliasearch/lite';
import instantsearch from 'instantsearch.js/dist/instantsearch.production.min';

// 个人中心设置中寻找
const searchClient = algoliasearch(
  // Application ID
  "GOTU1P0QSI",
  // Search-Only API Key
  "afe17d477c7298f25689a984e513524b"
);

// 实例化搜索
const search = instantsearch({
  // 索引名(在 algolia.com 中建立的索引)
  indexName: "site_title",
  searchClient,
});

search.addWidgets([
  // 初始化搜索框容器
  instantsearch.widgets.searchBox({
    container: "#searchbox",
    placeholder: 'Search for products',
  }),
  // 初始化项目展示区
  instantsearch.widgets.hits({
    container: "#hits",
    // 每项的模板
    templates: {
      item: `
          <article>
          <h1>{{#helpers.highlight}}{ "attribute": "title" }{{/helpers.highlight}}</h1>
          <p>{{#helpers.highlight}}{ "attribute": "icon" }{{/helpers.highlight}}</p>
          <img src="{{icon}}" alt=""></img>
          <p>{{#helpers.highlight}}{ "attribute": "url" }{{/helpers.highlight}}</p>
          <p>{{#helpers.highlight}}{ "attribute": "description" }{{/helpers.highlight}}</p>
          </article>
          `,
    },
  }),
  // 分页配置, 每页8项
  instantsearch.widgets.configure({
    hitsPerPage: 8,
  }),
  // 分类侧边栏
  // instantsearch.widgets.panel({
  //   templates: { header: "brand" },
  // })(instantsearch.widgets.refinementList)({
  //   container: "#brand-list",
  //   attribute: "brand",
  // }),
  // 分页容器
  instantsearch.widgets.pagination({
    container: "#pagination",
  }),
]);

search.start();
