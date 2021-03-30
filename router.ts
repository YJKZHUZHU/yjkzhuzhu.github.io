export const navs = [
  {
    title: '目录索引',
    path: null,
    children: [
      { title: 'JavaScript', path: '/js' },
      { title: 'Css', path: '/css' },
      { title: 'React', path: '/react' },
      { title: '开发效率', path: '/dev-tool' },
      { title: '面试', path: '/interview' },
    ],
  },
  { title: 'JavaScript', path: '/js' },
  { title: 'Css', path: '/css' },
  { title: 'React', path: '/react' },
  { title: 'Vue', path: '/vue' },
  { title: '开发效率', path: '/dev-tool' },
];

export const menus = {
  // 需要自定义侧边菜单的路径，没有配置的路径还是会使用自动生成的配置
  '/js': [
    {
      title: 'JavaScript',
      path: null,
      children: [
        // 菜单子项（可选）
        'js/array.md',
        'js/promise.md',
        'js/深拷贝和浅拷贝.md',
        'js/手写系列.md',
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
      title: 'React',
      path: null,
      children: ['react/hooksSummary.md'],
    },
  ],
  '/dev-tool': [
    {
      title: '开发效率',
      path: null,
      children: ['dev-tool/port.md'],
    },
  ],
};
