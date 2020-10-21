# storyMachine-admin

------

### ![](https://img.shields.io/badge/vue--cli--template-1.0.0-green.svg) ![](https://img.shields.io/badge/vue-2.6.10-green.svg) ![](https://img.shields.io/badge/iview-4.2.0-green.svg) 

### 开始

```shell
# 安装依赖包
$ npm install
$ 复制下面两行命令执行
find ./.git/hooks -type l -exec rm {} \;
find ./.githooks -type f -exec ln -sf ../../{} .git/hooks/ \;
```

```shell
# 本地开发
$ npm run dev:dev
```

```shell
# build
$ npm run build
```

> 其他暂时未用到： `npm run lint` `npm run test:unit`

### 关于代码规范

> 一般情况下在提交代码时候会检查代码规范和自动格式化代码，但是仅限于src文件夹下，对于其他文件貌似不行，故单独添加命令以满足条件

```shell
$ npm run lint

```
### css 代码规范

> 详细 参考[Stylelint](http://stylelint.cn/user-guide/rules/)

### 关于本地开发是本地mock数据

1. `src/libs/api.js` 添加接口 eg: `API.TEST = CONTEXT_PATH + '/test'`

2. `mock` 文件夹下添加新增文件 eg: `GET/api/test/index.js`  `GET` 代表请求的`method` 请求url是什么样子就在mock下建立什么样的文件夹 (参考列子见`GET/api/test/index.js`)

3. mock数据参照 `test`，使用的是 [mockjs](http://mockjs.com/)

   如有疑问请联系 liubiao@itoxs.com

### 关于本地开发

1. 本地mock

   ```shell
   $ npm run mock
   ```

这样启动命令就会让所有请求接口使用本地`mockjs` 进行开发，且必须事先写好mock逻辑

2. 本地开发代理其他地址接口

   > 需要配置的地方

   - `config/index.js` 

     ```js
     dev: {
         headers: {
             cookie: 'cookie_user_key=xxxx' // 登陆的用户名==
         },
         remote: {
             // 测试使用，正式代理请修改, 这里修改为代理的域
             path: 'http://qzone-music.qq.com'
         }
      }
     ```


   - 启动服务 `npm run remote`

3. 本地使用`https` (一旦本地开发使用`https` 将无法再热更新)

   > 本地也可以使用`https`了，使用方法见下方

   - `npm run serve`  ---> `npm run serve:https` : 常规启动
   - `npm run mock`  --->  `npm run mock:https` : 本地mock启动
   - `npm run remote`  ---> `npm run remote:https` : 远程mock启动
