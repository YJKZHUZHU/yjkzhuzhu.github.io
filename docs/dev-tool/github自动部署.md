<!--
 * @Author: 豆芽(douya.ye@tuya.com)
 * @Date: 2022-03-08 17:36:49
 * @LastEditTime: 2022-03-08 17:40:27
 * @LastEditors: 豆芽(douya.ye@tuya.com)
 * @Description:
 * @FilePath: /yjkzhuzhu.github.io/docs/dev-tool/github自动部署.md
-->

## github Action 自动部署

### 前言

> Github Actions 在 GitHub Actions 的仓库中自动化、自定义和执行软件开发工作流程。 您可以发现、创建和共享操作以执行您喜欢的任何作业（包括 CI/CD），并将操作合并到完全自定义的工作流程中。

简单来说，github actions 是 github 提供的一种免费自动化部署平台，在每个 Git 仓库中都可以看到，如下图，执行 Actions 时，Github 会提供一个服务器进行一些自动化操作，比如提交代码时触发自动编译，然后把编译结果部署到指定的服务器，如果是无须编译的代码，也可以利用 Github 提供的这台服务器通过 SSH 远程控制自己服务器拉取代码，然后在自己服务器执行其他命令操作。
