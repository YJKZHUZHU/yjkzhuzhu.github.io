<!--
 * @Author: 豆芽(douya.ye@tuya.com)
 * @Date: 2022-03-08 17:36:49
 * @LastEditTime: 2022-03-08 20:31:34
 * @LastEditors: 豆芽(douya.ye@tuya.com)
 * @Description:
 * @FilePath: /yjkzhuzhu.github.io/docs/dev-tool/github自动部署.md
-->

## github Action 自动部署

### 前言

> Github Actions 在 GitHub Actions 的仓库中自动化、自定义和执行软件开发工作流程。 您可以发现、创建和共享操作以执行您喜欢的任何作业（包括 CI/CD），并将操作合并到完全自定义的工作流程中。

简单来说，github actions 是 github 提供的一种免费自动化部署平台，在每个 Git 仓库中都可以看到，如下图，执行 Actions 时，Github 会提供一个服务器进行一些自动化操作，比如提交代码时触发自动编译，然后把编译结果部署到指定的服务器，如果是无须编译的代码，也可以利用 Github 提供的这台服务器通过 SSH 远程控制自己服务器拉取代码，然后在自己服务器执行其他命令操作。

<img src="../../public/github自动部署/1.png" style="zoom:50%;" />

### 主题

- Github-page 部署自己的网站
  1. 无服务端
  2. 纯静态网站
  3. 适用于博客
- github-action 自动部署到服务器

### github-page

#### 准备工作

- 创建[username].github.io 仓库

- 准备好一份静态资源-如 dumi 文档生成工具

- 生成访问令牌-推送代码需要使用到-[链接](https://github.com/settings/tokens)

  1. 创建

  <img src="../../public/github自动部署/2.png" style="zoom:50%;" />

  2. 复制令牌

     <img src="../../public/github自动部署/3.png" style="zoom:50%;" />

  3. 设置令牌

     <img src="../../public/github自动部署/4.png" style="zoom:50%;" />

     设置变量-yml 脚本中在推送代码的时候会使用到

     <img src="../../public/github自动部署/5.png" style="zoom:50%;" />

     ​ 查看

     <img src="../../public/github自动部署/6.png" style="zoom:50%;" />

* Action yml 自动化脚本

  新建.github 文件夹-新建\*\*\*.yml 文件

  具体想了解 yml 命令的使用，可参考相关文档

  ```yml
  name: 自动化部署
  on: [push] # 在push代码的时候触发action

  jobs:
    deploy:
      runs-on: ubuntu-latest # 使用那种服务器

      steps:
        - name: 拉取代码
          uses: actions/checkout@v2
        - name: 安装依赖
          run: yarn
        - name: 编译构建
          run: yarn run build

        - name: 部署
          uses: peaceiris/actions-gh-pages@v3 # github-page的插件
          with:
            github_token: ${{ secrets.ACCESS_TOKEN }} # 刚生成的令牌
            publish_dir: ./dist # 将打包的dist文件夹所有的内容推送到gh-pages分支下
  ```

  gh-page 分支下的文件结构

  <img src="../../public/github自动部署/7.png" style="zoom:50%;" />

* 配置 github-page

​ <img src="../../public/github自动部署/8.png" style="zoom:50%;" />
