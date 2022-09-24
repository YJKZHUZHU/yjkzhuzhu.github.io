## Taro

### [版本架构](https://segmentfault.com/a/1190000021466416)

#### 1.x 版本

- 重编译时，轻运行时
- 编译后代码与 React 无关：Taro 只是在开发时遵循了 React 的语法
- 直接使用 Babel 进行编译：这也导致当前 Taro 在工程化和插件方面的羸弱。

#### 2.x 版本

- 无 DSL 限制：无论是你们团队是 React 还是 Vue 技术栈，都能够使用 Taro 开发
- 模版动态构建：和之前模版通过编译生成的不同，Taro Next 的模版是固定的，然后基于组件的 template，动态 “递归” 渲染整棵 Taro DOM 树。
- 新特性无缝支持：由于 Taro Next 本质上是将 React/Vue 运行在小程序上，因此，各种新特性也就无缝支持了。
- 社区贡献更简单：错误栈将和 React/Vue 一致，团队只需要维护核心的 taro-runtime。
- 基于 Webpack：Taro Next 基于 Webpack 实现了多端的工程化，提供了插件功能。

#### 3.x 版本

- 适配多种框架
- 多端转换支持
