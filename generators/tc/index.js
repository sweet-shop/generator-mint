/**
 * @File:      脚手架模板配置文件下载
 * @Author:    花夏(liubiao@itoxs.com)
 * @Version:   V1.0.0
 * @Date:      2020-10-21 20:39:05
 */
const ora = require('ora');
const chalk = require('chalk');
const Generator = require('yeoman-generator');
const path = require('path');
const download = require('download');
const ORA_SPINNER = {
    interval: 80,
    frames: [
        '   ⠋',
        '   ⠙',
        '   ⠚',
        '   ⠞',
        '   ⠖',
        '   ⠦',
        '   ⠴',
        '   ⠲',
        '   ⠳',
        '   ⠓'
    ]
};
module.exports = class extends Generator {
    constructor(params, opts) {
        super(params, opts);
        this.tplConfigUrl = require('./config.json').tplConfigUrl;
        // 获取模板路径
        this.templSrc = this.templatePath();
        const generatorName = this.rootGeneratorName();
        this.ROOT = this.templatePath().split(path.sep).join('/').split(generatorName)[0] + generatorName;
        this.lang = require(`${path.join(this.ROOT, '/lang/config.json')}`).lang || 'zh-CN';
        this.langJSON = require(`${path.join(this.ROOT, `/lang/i18n/${this.lang}.json`)}`);
        this.tc = this.langJSON.tc;
    }
    writing() {
        this.spinner = ora({
            text: `😋 ${this.tc.oraStar} ${this.tplConfigUrl} ...`,
            spinner: ORA_SPINNER
        }).start();
        this._downloadTplConfig()
            .then(() => {
                const info = `🎉 ${chalk.green(this.tc.oraFinish)}`;
                this.spinner.stopAndPersist({
                    symbol: chalk.green('   ✔'),
                    text: info
                });
            });
    }
    _downloadTplConfig() {
        return new Promise((resolve, reject) => {
            download(
                this.tplConfigUrl,
                path.join(this.templatePath(), '../../app')
            ).on('response', (res) => {
                res.on('end', () => {
                    resolve();
                });
            });
        });
    }
    end() {}
};
