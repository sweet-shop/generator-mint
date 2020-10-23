# generator-mint 薄荷糖脚手架

[![GitHub issues](https://img.shields.io/github/issues/sweet-shop/generator-mint.svg)](https://github.com/sweet-shop/generator-mint/issues)
[![GitHub forks](https://img.shields.io/github/forks/sweet-shop/generator-mint.svg)](https://github.com/sweet-shop/generator-mint/network)
[![GitHub stars](https://img.shields.io/github/stars/sweet-shop/generator-mint.svg)](https://github.com/sweet-shop/generator-mint/stargazers)
[![GitHub license](https://img.shields.io/github/license/sweet-shop/generator-mint.svg)](https://github.com/sweet-shop/generator-mint/blob/master/LICENSE)

## Installation

First, install [Yeoman](http://yeoman.io) and generator-mint using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
[sudo] npm install -g yo
[sudo] npm install -g generator-mint
```

Then generate your new project:

```bash
yo mint
```
目录生成成功后，请阅读：[README.md](https://github.com/sweet-shop/generator-mint/blob/main/README.md)

项目架子初始化完成（注意：这时只有welcome示例页面）,目录结构如下：

    mint
    ├── .gitignore  // 忽略git提交文件
    ├── README.md  // 项目说明文件
    ├── .browserslistrc  // .browserslistrc配置
    ├── .editorconfig  // .editorconfig配置
    ├── .env.*  // env.*编译配置
    ├── .babelrc  // babel编译配置
    ├── .editorconfig // 编辑器规范配置
    ├── .eslintignore // eslint代码检查忽略文件配置
    ├── .eslintrc.js  // eslint代码检查配置
    ├── .prettierignore  // prettier 忽略文件配置
    ├── .prettierrc // prettierrc配置
    ├── .stylelintignore // stylelinti 配置
    ├── .stylelintignore // stylelinti 忽略文件配置
    ├── .babel.config.js // babel配置
    ├── Makefile // Makefile配置
    ├── package.json // 项目依赖配置
    ├── vue.config // vue配置
    ├── LICENSE    // 许可证 MIT
    ├── config  // 通用配置等
    ├── mock  // mock
    ├── public  // 项目静态文件
    ├── src
    ├── ├── assets // 静态公用资源
    ├── ├── components // 公用组件
    ├── ├── install // vue install
    ├── ├── libs // 工具箱
    ├── ├── router // 路由配置
    ├── ├── store // store配置
    ├── ├── views // 业务代码处
    └── └── views // 业务代码处

## 支持功能

1.本地mock： 更改config/index.js : mockLocal: 1, // 1為本地 \ 0為代理 remote中可配置代理地址

2.自动获取本地局域方地址（192.*.*.*）方便局域网查看

3.自动获取端口号(默认8888)，不再为端口号占用烦恼，提高效率

4.运行 `npm run dev`后自动代开浏览器，不必手动打开，提高效率 更改config/index.js : browser: 'google chrome', // 可配置 firefox \ google chrome \ Safari

5.支持eslint 本地开发必须符合[代码规范](https://github.com/huarxia/standard),也可以单独运行`npm run lint`

## 感谢这些开源项目

1. [yeoman](http://yeomanjs.org/)
2. [Vue.js](http://vuejs.org/)
3. [iviewui](https://www.iviewui.com/)

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

MIT © [花夏](http://www.huar.love)
