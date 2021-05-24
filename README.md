# generator-mint 薄荷糖脚手架 [En Doc](./README_EN.md)
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

[![GitHub issues](https://img.shields.io/github/issues/sweet-shop/generator-mint.svg)](https://github.com/sweet-shop/generator-mint/issues)
[![GitHub forks](https://img.shields.io/github/forks/sweet-shop/generator-mint.svg)](https://github.com/sweet-shop/generator-mint/network)
[![GitHub stars](https://img.shields.io/github/stars/sweet-shop/generator-mint.svg)](https://github.com/sweet-shop/generator-mint/stargazers)
[![GitHub license](https://img.shields.io/github/license/sweet-shop/generator-mint.svg)](https://github.com/sweet-shop/generator-mint/blob/master/LICENSE)

## 安装

首先,使用[npm](https://www.npmjs.com/)安装 [Yeoman](http://yeoman.io) 和 `generator-mint` (假设您已经预装了[node.js](https://nodejs.org/)).

```bash
[sudo] npm install -g yo
[sudo] npm install -g generator-mint
```

然后生成一个新项目:

```bash
yo mint
```
目录生成成功后，请阅读：[README.md](https://github.com/sweet-shop/generator-mint/blob/master/generators/app/templates/README.md)

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
    ├── vue.config.js // vue配置
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
    └── └── views // 业务代码处

## generator-mint 支持功能

1. `yo mint:h`        显示帮助

   ```shell
               _       _
     _ __ ___ (_)_ __ | |_
    | '_ ` _ \| | '_ \| __|
    | | | | | | | | | | |_
    |_| |_| |_|_|_| |_|\__|
   
   需要帮助?  ===>  yo mint:h
   CMD: generator-mint
   
   mint@v1.1.0
   node@v14.13.1
   os@Windows_NT 10.0.18363
   
   Yeoman 命令
      yo mint              在根目录执行，初始化Project
      yo mint:h            显示帮助
      yo mint:lang         设置脚手架语言
      yo mint:tc           克隆远端模板配置文件到脚手架
      yo mint:sc           设置远端模板配置文件下载路径
      yo mint:tpl          查看本机模板配置
      yo mint:tpl list     查看本机模板配置
      yo mint:tpl add      新增模板配置
      yo mint:tpl move     移动模板到指定位置(方便将自己常用的移动至最前面)
      yo mint:tpl export   导出模板到桌面
      yo mint:tpl del      删除模板配置
   项目   命令
      npm run dev     本地开发启动命令
      npm run build   本地build
      npm run lint    本地eslint检测
    
    Tool documentation： https://github.com/sweet-shop/generator-mint
    author by @花夏 liubiao@itoxs.com
   ```

   ![](https://sweet-shop.github.io/obs/generator-mint/yo-mint-h.gif)

   ### 注意!!!
   
   > 如果在使用这些命令: `yo mint:lang` `yo mint:tc` `yo mint:sc`
   
   > 出现权限问题，比如: `Error: EACCES: permission denied, open '/usr/local/lib/node_modules/generator-mint/generators/tc/config.json'`

   > 请执行命令: `sudo chown -R $USER  /usr/local/lib/node_modules/generator-mint`
   
   > 其中: $USER 代表你当前电脑名. (此条只有mac会出现，Windows请使用管理员运行终端则不会出现)

2. `yo mint:lang`  设置脚手架语言,执行此命令可以设置mint的交互显示语言

   ```
   🌺 欢迎使用 薄荷糖 脚手架!
               _       _
     _ __ ___ (_)_ __ | |_
    | '_ ` _ \| | '_ \| __|
    | | | | | | | | | | |_
    |_| |_| |_|_|_| |_|\__|
   
   需要帮助?  ===>  yo mint:h
   CMD: generator-mint
   
   ? ️‍🌈 请选择您想设置的语言!  (Use arrow keys)
   > 默认(中文)
     en
     zh-CN
   ```

   ![](https://sweet-shop.github.io/obs/generator-mint/yo-mint-lang.gif)

3. `yo mint:tc`      克隆远端模板配置文件到脚手架

   > 默认连接：`https://raw.githubusercontent.com/sweet-shop/generator-mint/master/generators/app/templateConfig.js`

   

   ![](https://sweet-shop.github.io/obs/generator-mint/yo-mint-tc.gif)

4. `yo mint:sc`      设置远端模板配置文件下载路径

   ```shell
   ? 请选择执行方式:  (Use arrow keys)
   > custom # 自定义远端模板配置文件下载路径 确认后会要求你输入一个正确的 templateConfig.js 下载路径
     default # 使用默认，选择此选项可以恢复脚手架默认下载链接
   ```

   `templateConfig.js` 示例：

   ```javascript
   module.exports = [
       {
           name: 'template-vue', // 名称，后续脚手架交互显示
           url: 'https://github.com/sweet-shop/template-vue.git' // 远端维护的模板，必须git [github | gitlab]
       }
   ];
   
   ```

   ![](https://sweet-shop.github.io/obs/generator-mint/yo-mint-sc.gif)

5. `yo mint`            开始使用`mint`初始化您的项目

   ![](https://sweet-shop.github.io/obs/generator-mint/yo-mint.gif)

   ![](https://sweet-shop.github.io/obs/generator-mint/yo-mint-tpl.gif)

   ![](https://sweet-shop.github.io/obs/generator-mint/yo-mint-user-defined.gif)

## 默认template project 支持功能

1.本地mock： 更改config/index.js : mockLocal: 1, // 1為本地 \ 0為代理 remote中可配置代理地址

2.自动获取本地局域方地址（192.*.*.*）方便局域网查看

3.自动获取端口号(默认8888)，不再为端口号占用烦恼，提高效率

4.运行 `npm run dev`后自动代开浏览器，不必手动打开，提高效率 更改config/index.js : browser: 'google chrome', // 可配置 firefox \ google chrome \ Safari

5.支持eslint 本地开发必须符合[代码规范](https://github.com/huarxia/standard),也可以单独运行`npm run lint`

## 感谢这些开源项目

1. [yeoman](http://yeomanjs.org/)
2. [Vue.js](https://cn.vuejs.org/)
3. [iviewui](https://www.iviewui.com/)

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

MIT © [花夏](http://www.huar.love)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://huarxia.github.io/blog/"><img src="https://avatars0.githubusercontent.com/u/11221788?v=4" width="100px;" alt=""/><br /><sub><b> 花夏</b></sub></a><br /><a href="#design-huarxia" title="Design">🎨</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
