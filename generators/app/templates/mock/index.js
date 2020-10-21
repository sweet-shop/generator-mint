/**
 * @file:      mock 数据入口
 * @author:    花夏(liubiao@itoxs.com)
 * @version:   V1.0.0
 * @date:      2020-10-21 20:49:28
 */
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const Mock = require('mockjs');
const _ = require('lodash');
const config = require('../config');
const mockRemoteUrl = require('./mock-remote-url');
const mockLocalUrl = require('./mock-local-url');
module.exports = {
    /**
     * mockLocal 本地mock逻辑
     * @return {type} description
     */
    mockLocal(req, res, next) {
        let mockSrc = path.join(process.cwd(), '/mock/');
        let XML = req.headers['x-requested-with'];
        if (XML && /XMLHttpRequest/.test(XML)) {
            let url = req.url;
            if (/\?/.test(url)) {
                url = url.split('?')[0];
            }
            if (mockLocalUrl.includes(url)) {
                mockSrc = mockSrc + req.method + url + '/index.js';
                // 解决返回中文乱码问题
                res.setHeader('Content-Type', 'text/html; charset=utf-8');
                fs.exists(mockSrc, function(exists) {
                    // 读取文件失败/错误 说明没有此mock数据文件
                    if (!exists) {
                        console.log(
                            chalk.black.bgRed(' Error ')
                            + ' --> '
                            + chalk.yellow(mockSrc)
                            + chalk.red(' 不存在或者请求路径错误')
                        );
                        process.exit(1);
                    }
                    // 读取文件成功
                    const request = require(mockSrc);
                    console.log(chalk.bgGreen.black('\n ' + req.method + ' ') + ' ' + chalk.green(mockSrc));
                    let data = JSON.stringify(request(), null, 4);
                    res.write(data);
                    // 模拟ajax延迟时间
                    setTimeout(() => {
                        res.end();
                    }, Mock.mock('@natural(618, 2000)'));
                });
                // 必须return 否则post请会报错
                return;
            }
            let httpProxy = require('http-proxy');
            let base = process.env.VUE_APP_ORIGIN;
            delete req.headers.host;
            req.headers['content-type'] = 'application/json; charset=utf-8';
            let proxy = httpProxy.createProxyServer({
                target: base
            });
            console.log(
                chalk.bgGreen.black('\n ' + req.method + ' ') + ' ' + chalk.yellow('proxy- URL: ') + chalk.green(base + req.url)
            );
            req.headers = _.assign(req.headers, config.dev.remote.headers);
            proxy.web(req, res);
            return;
        }
        next();
    },

    /**
     * mockRemote 远程服务器
     */
    mockRemote(req, res, next) {
        let httpProxy = require('http-proxy');
        let base = config.dev.remote.path;
        delete req.headers.host;
        req.headers['content-type'] = 'application/json; charset=utf-8';
        const XML = req.headers['x-requested-with'];
        const url = req.url.split('?')[0];
        // 如果是XMLHttpRequest則走代理，否則走本地
        if (XML && /XMLHttpRequest/.test(XML)) {
            if (!mockRemoteUrl.includes(url)) {
                base = process.env.VUE_APP_ORIGIN;
            }
            let proxy = httpProxy.createProxyServer({
                target: base
            });
            console.log(
                chalk.bgGreen.black('\n ' + req.method + ' ') + ' ' + chalk.yellow('proxy- URL: ') + chalk.green(base + req.url)
            );
            req.headers = _.assign(req.headers, config.dev.remote.headers);
            proxy.web(req, res);
        } else {
            next();
        }
    },

    /**
     * @param {Number} times 回调函数需要执行的次数
     * @param {Function} callback 回调函数
     */
    doCustomTimes(times, callback) {
        let i = -1;
        while (++i < times) {
            callback(i);
        }
    }
};
