import { defineConfig } from 'dumi';

export default defineConfig({
  title: '尛豆芽',
  mode: 'site',
  favicon: '/favicon.ico',
  logo: '/logo.jpg',
  navs: [
    // null, // null 值代表保留约定式生成的导航，只做增量配置
    {
      title: '目录索引',
      path: null,
      children: [
        { title: 'JavaScript', path: '/js' },
        { title: 'Css', path: '/css' },
        { title: 'React', path: '/react' },
      ],
    },
    { title: 'JavaScript', path: '/js' },
    { title: 'Css', path: '/css' },
    { title: 'React', path: '/react' },
    { title: 'Vue', path: '/vue' },
  ],
  menus: {
    // 需要自定义侧边菜单的路径，没有配置的路径还是会使用自动生成的配置
    '/js': [
      {
        title: 'JavaScript',
        path: null,
        children: [
          // 菜单子项（可选）
          'js/array.md',
          'js/promise.md',
        ],
      },
    ],
    '/css': [
      {
        title: 'Css',
        path: null,
        children: ['css/center.md'],
      },
    ],
    '/react': [
      {
        title: '浅谈React hooks',
        path: null,
        children: ['react/hooksSummary.md'],
      },
    ],
  },
});
