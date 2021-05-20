/*
 * @Description: 模板相关入口文件
 * @Version: V1.0.0
 * @Author: huarxia
 * @Date: 2021-05-20 09:38:03
 * @LastEditors: huarxia
 * @LastEditTime: 2021-05-20 09:38:03
 */
const chalk = require('chalk');
const Generator = require('yeoman-generator');
const fs = require('fs');
const path = require('path');

module.exports = class extends Generator {
    constructor(params, opts) {
        super(params, opts);
        const generatorName = this.rootGeneratorName();
        this.ROOT = this.templatePath().split(path.sep).join('/').split(generatorName)[0] + generatorName;
        this.lang = require(`${path.join(this.ROOT, '/lang/config.json')}`).lang || 'zh-CN';
        this.langJSON = require(`${path.join(this.ROOT, `/lang/i18n/${this.lang}.json`)}`);
        this.tplJSON = this.langJSON.tpl;
        // 获取子命令name
        const COMMAND = opts._ || [];
        this.cmd = COMMAND[0];
        if (COMMAND.length === 0) {
            this.cmd = 'list';
        }
    }
    initializing() {
        try {
            const stat = fs.statSync(path.join(__dirname, this.cmd));
            this._composeWith(this.cmd);
        } catch(e) {
            // 文件夹不存在，说明不存在该命令
            this.log(chalk.bgRed(this.tplJSON.no_order + ':') + chalk.red(' yo mint:tpl ' + this.cmd));
        }
    }
    _composeWith(cmd) {
        const path = `./${cmd}`;
        this.composeWith({
            Generator: require(path),
            path: require.resolve(path)
        });
    }
};