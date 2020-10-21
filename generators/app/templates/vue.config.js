/**
 * @file: vue.config
 * @author: liubiao
 * @version: 1.0.0
 * @date: 2020-08-11 14:12:33
 * @github: https://github.com/huarxia
 */
const path = require('path');
const util = require('./config/util');
const resolve = dir => {
    return path.join(__dirname, dir);
};
const mock = require('./mock');
// 项目部署基础
// 默认情况下，我们的应用将被部署在域的根目录下,
// 例如：https://www.my-app.com/
// 默认：'/'
// 如果要将应用程序部署在子路径中，则需要在这指定子路径
// 例如：https://www.foobar.com/my-app/
// 需要将它改为'/my-app/'
let port = 8888;
util.getPort(port, portNum => {
    port = portNum;
});
module.exports = {
    lintOnSave: process.env.NODE_ENV !== 'production',
    // Project deployment base
    // By default we assume your app will be deployed at the root of a domain,
    // e.g. https://www.my-app.com/
    // If your app is deployed at a sub-path, you will need to specify that
    // sub-path here. For example, if your app is deployed at
    // https://www.foobar.com/my-app/
    // then change this to '/my-app/'
    publicPath: './',
    // tweak internal webpack configuration.
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    chainWebpack: config => {
        config.resolve.alias
            .set('@libs', resolve('src/libs')) // key,value自行定义，比如.set('@@', resolve('src/components'))
            .set('@component', resolve('src/components'))
            .set('@view', resolve('src/view'))
            .set('@config', resolve('config'))
            .set('@image', resolve('src/assets/image'));
        const oneOfsMap = config.module.rule('less').oneOfs.store;
        oneOfsMap.forEach(item => {
            item.use('style-resources-loader')
                .loader('style-resources-loader')
                .options({
                    // 需要插入的文件路径
                    patterns: './src/assets/css/theme.less'
                    // 需要插入的文件路径数组
                    // patterns: ["./path/to/vars.less", "./path/to/mixins.less"]
                })
                .end();
        });
    },
    configureWebpack: config => {
        const StyleLintPlugin = require('stylelint-webpack-plugin');
        config.plugins.push(
            new StyleLintPlugin({
                files: ['src/**/*.{vue,html,css,scss,sass,less}'],
                failOnError: false,
                cache: true,
                fix: false,
            })
        );
        Object.assign(config, {
            externals: {
                "BMap": "BMap",
                'Loca': 'Loca'
            }
        });
    },
    // 打包时不生成.map文件
    productionSourceMap: false,
    devServer: {
        // eslint
        overlay: {
            warnings: true,
            errors: true
        },
        // 启动时打开浏览器
        open: true,
        // 打开浏览器时的路径
        openPage: '',
        // 服务端口
        port: port,
        // 设置代理
        proxy: null,
        // 关闭host检查
        disableHostCheck: true,
        before(app) {
            // 在proxy之前加载本地mock 1为本地mock 0为远程mock
            const MOCK = process.env.VUE_APP_MOCK;
            if (MOCK === '1') {
                app.use(mock.mockLocal);
            } else if (MOCK === '0') {
                app.use(mock.mockRemote);
            }
        }
    }
};
