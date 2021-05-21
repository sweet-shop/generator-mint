/*
 * @Description: yo mint:tpl export 导出模板配置文件到本地
 * @Version: V1.0.0
 * @Author: liubiao@itoxs.com
 * @Date: 2021-05-21 16:56:55
 */
const chalk = require('chalk');
const Generator = require('yeoman-generator');
const path = require('path');
const fs = require('fs');
const os = require('os');
const $dayjs = require('dayjs');
const templateConfig = require('../../lib/getTemplateConfig');
module.exports = class extends Generator {
    constructor(params, opts) {
        super(params, opts);
        const generatorName = this.rootGeneratorName();
        const userInfo = os.userInfo();
        this.currentUsername = userInfo.username;
        this.ROOT = this.templatePath().split(path.sep).join('/').split(generatorName)[0] + generatorName;
        this.lang = require(`${path.join(this.ROOT, '/lang/config.json')}`).lang || 'zh-CN';
        this.langJSON = require(`${path.join(this.ROOT, `/lang/i18n/${this.lang}.json`)}`);
        this.tplJSON = this.langJSON.tpl.list;
        this.exportJSON = this.langJSON.tpl.export;
        this.fileName = 'templateConfig.js';
        this.desktopPath = path.join(require('os').homedir(), 'Desktop')
    }
    initializing() {
        this.log(chalk.bgCyan(this.tplJSON.placeholder));
        const conTpl = templateConfig.getTemplateConfigOfTable();
        this.log(conTpl);
        this.log(chalk.bgCyan(this.exportJSON.exportPath) + ' ===> ' +  chalk.blue(this.desktopPath));
        this.log(chalk.bgCyan(this.exportJSON.exportFileName) + ' ===> ' + chalk.green(this.fileName));
    }
    writing() {
        const conTpl = templateConfig.getTemplateConfigOfJson();
        const TPL_CON = [].concat(conTpl);
        const TPL_CON_STR = `/**
 * @File:      克隆远程仓库模板配置
 * @Author:    花夏(liubiao@itoxs.com)
 * @Version:   V1.0.0
 * @Date:      2020-10-23 11:27:32
 * @LastEditors: ${this.currentUsername}
 * @LastEditTime: ${$dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss') }
 */
module.exports = ${JSON.stringify(TPL_CON)};`;
this.log(TPL_CON_STR);
        fs.writeFile(
            path.join(this.desktopPath, this.fileName),
            TPL_CON_STR,
            { encoding: 'utf8' },
            err => {
                if (err) {
                    const errInfo = chalk.red(err);
                    this.log(errInfo);
                    return;
                }
                const info = chalk.green(this.exportJSON.end.done);
                this.log(info);
            }
        );
    }
    end() {}
};
