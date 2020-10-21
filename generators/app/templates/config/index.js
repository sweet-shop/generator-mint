/**
 * @file:      本地开发配置文件
 * @author:    花夏(liubiao@itoxs.com)
 * @version:   V1.0.0
 * @date:      2020-10-21 20:47:18
 */

// let path = require('path');
module.exports = {
    dev: {
        headers: {
            cookie: 'cookie_user_key=xxxx' // 登陆的用户名==
        },
        remote: {
            // 测试使用，正式代理请修改
            path: 'http://xx.xx.com'
        }
    }
};
