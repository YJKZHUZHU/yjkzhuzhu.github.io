import { defineConfig } from 'dumi';
import { navs, menus } from './router';

export default defineConfig({
  title: '尛豆芽hahhaha',
  mode: 'site',
  favicon: '/favicon.ico',
  logo: '/logo.jpg',
  navs,
  menus,
});
