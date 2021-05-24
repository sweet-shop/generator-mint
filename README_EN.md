# generator-mint [中文文档](./README.md)
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

[![GitHub issues](https://img.shields.io/github/issues/sweet-shop/generator-mint.svg)](https://github.com/sweet-shop/generator-mint/issues)
[![GitHub forks](https://img.shields.io/github/forks/sweet-shop/generator-mint.svg)](https://github.com/sweet-shop/generator-mint/network)
[![GitHub stars](https://img.shields.io/github/stars/sweet-shop/generator-mint.svg)](https://github.com/sweet-shop/generator-mint/stargazers)
[![GitHub license](https://img.shields.io/github/license/sweet-shop/generator-mint.svg)](https://github.com/sweet-shop/generator-mint/blob/master/LICENSE)

## Installation

First, install [Yeoman](http://yeoman.io) and `generator-mint` using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
[sudo] npm install -g yo
[sudo] npm install -g generator-mint
```

Then generate your new project:

```bash
yo mint
```
After the directory is successfully generated, please read：[README.md](https://github.com/sweet-shop/generator-mint/blob/master/generators/app/templates/README.md)

he initialization of the project shelf is completed (Note: only the welcome sample page is available at this time). The directory structure is as follows：

    mint
    ├── .gitignore  // Ignore git submission
    ├── README.md  // Project description document
    ├── .browserslistrc  // .browserslistrc configuration
    ├── .editorconfig  // .editorconfig configuration
    ├── .env.*  // env.* Compile configuration
    ├── .babelrc  // babel Compile configuration
    ├── .editorconfig // Editor specification configuration
    ├── .eslintignore // eslint Code checking ignores file configuration
    ├── .eslintrc.js  // eslint Code check configuration
    ├── .prettierignore  // prettier Ignore file configuration
    ├── .prettierrc // prettierrc configuration
    ├── .stylelintignore // stylelinti configuration
    ├── .stylelintignore // stylelinti Ignore file configuration
    ├── .babel.config.js // babel configuration
    ├── Makefile // Makefile configuration
    ├── package.json // Project dependency configuration
    ├── vue.config.js // vue configuration
    ├── LICENSE    // LICENSE
    ├── config  // General configuration, etc
    ├── mock  // mock
    ├── public  // Project static file
    ├── src
    ├── ├── assets // Static public resources
    ├── ├── components // Common components
    ├── ├── install // vue install
    ├── ├── libs // tools
    ├── ├── router // router configuration
    ├── ├── store // store configuration
    └── └── views // codes

## generator-mint Support options

1. `yo mint:h`       Show help

   ```shell
               _       _
     _ __ ___ (_)_ __ | |_
    | '_ ` _ \| | '_ \| __|
    | | | | | | | | | | |_
    |_| |_| |_|_|_| |_|\__|
   
   Need help?  ===>  yo mint:h
   CMD: generator-mint
   
   mint@v1.1.0
   node@v14.13.1
   os@Windows_NT 10.0.18363
   
   Yeoman command
      yo mint              Execute in the root directory, initialize Project
      yo mint:h            Show help
      yo mint:lang         Set generator language
      yo mint:tc           Clone remote template configuration file to generator
      yo mint:sc           Set remote template profile download path
      yo mint:tpl          View native template configuration
      yo mint:tpl list     View native template configuration
      yo mint:tpl add      Add a template configuration
      yo mint:tpl move     Move the template to the specified position (convenient to move your common template to the front)
      yo mint:tpl export   Export template to desktop
      yo mint:tpl del      Delete template configuration
   Project command
      npm run dev     Local development start command
      npm run build   Local build
      npm run lint    Local eslint check
   
   
   Tool documentation： https://github.com/sweet-shop/generator-mint
   author by @花夏 liubiao@itoxs.com
   ```

   ![](https://sweet-shop.github.io/obs/generator-mint/yo-mint-h.gif)

   ### FBI Warning!!!
   
   > If you are using these commands: `yo mint:lang` `yo mint:tc` `yo mint:sc`
   
   > There are permission problems, such as: `Error: EACCES: permission denied, open '/usr/local/lib/node_modules/generator-mint/generators/tc/config.json'`

   > Please run: `sudo chown -R $USER  /usr/local/lib/node_modules/generator-mint`
   
   > Where: $user represents the name of your current computer. (this item only appears in MAC, but not in windows if you use administrator to run the terminal)

2. `yo mint:lang`  Set the scaffold language, execute this command to set the interactive display language of mint

   ```
   🌺 Welcome to the generator-mint generator!
               _       _
     _ __ ___ (_)_ __ | |_
    | '_ ` _ \| | '_ \| __|
    | | | | | | | | | | |_
    |_| |_| |_|_|_| |_|\__|
   
   Need help?  ===>  yo mint:h
   CMD: generator-mint
   
   ? 🌈 Please select the language!  (Use arrow keys)
   > 默认(中文)
     en
     zh-CN
   ```

   ![](https://sweet-shop.github.io/obs/generator-mint/yo-mint-lang.gif)

3. `yo mint:tc`      Clone remote template configuration file to generator-mint

   > 默认连接：`https://raw.githubusercontent.com/sweet-shop/generator-mint/master/generators/app/templateConfig.js`

   

   ![](https://sweet-shop.github.io/obs/generator-mint/yo-mint-tc.gif)

4. `yo mint:sc`      Set remote template profile download path

   ````shell
   ? Please select the type:  (Use arrow keys)
   > custom # Custom remote template configuration file download path confirmation will ask you to enter a correct templateConfig.js Download path
     default # Using default, select this option to restore the scaffold default download link
   ````

   `templateConfig.js`  Example：

   ```javascript
   module.exports = [
       {
           name: 'template-vue', // Name, subsequent scaffold interactive display
           url: 'https://github.com/sweet-shop/template-vue.git' // Remote maintenance template, must git [github | gitlab]
       }
   ];
   
   ```

   ![](https://sweet-shop.github.io/obs/generator-mint/yo-mint-sc.gif)

5. `yo mint`            Start initializing your project with `mint`

   ![](https://sweet-shop.github.io/obs/generator-mint/yo-mint.gif)

   ![](https://sweet-shop.github.io/obs/generator-mint/yo-mint-tpl.gif)

   ![](https://sweet-shop.github.io/obs/generator-mint/yo-mint-user-defined.gif)

## default template project: Support options

1. Local mock： chhange -- > config/index.js :  mockLocal: 1,  // 1 is local   0 is remote
2. Automatically get the address of local area network (192. *. * *), which is convenient for local area network to view
3. Automatic access to port number (default 8888), no longer for the port number occupied trouble, improve efficiency
4. After running 'NPM run dev', the browser will be opened automatically. It is unnecessary to open the browser manually, which can improve the efficiency and change the config/ index.js : Browser: 'Google Chrome', / / configurable for Firefox, Google Chrome, Safari
5.  Supporting local development of eslint must comply with [code specification]( https://github.com/huarxia/standard ).You can also run `npn run lint`

## Thank you for these open source projects

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
