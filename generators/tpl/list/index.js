/*
 * @Description: 新增 yo mint:tpl | yo mint:tpl list 支持查看模板配置
 *               默认：yo mint:tpl
 * @Version: V1.0.0
 * @Author: liubiao@itoxs.com
 * @Date: Fri May 14 2021 11:10:12
 * @LastEditors: Last commit by
 * @LastEditTime: Fri May 14 2021 15:46:09
 */
const chalk = require('chalk');
const Generator = require('yeoman-generator');
const fs = require('fs');
var os = require('os');
const path = require('path');
const $dayjs = require('dayjs');
const templateConfig = require('../../app/templateConfig');
module.exports = class extends Generator {
    constructor(params, opts) {
        super(params, opts);
        const generatorName = this.rootGeneratorName();
        this.ROOT = this.templatePath().split(path.sep).join('/').split(generatorName)[0] + generatorName;
        this.lang = require(`${path.join(this.ROOT, '/lang/config.json')}`).lang || 'zh-CN';
        this.langJSON = require(`${path.join(this.ROOT, `/lang/i18n/${this.lang}.json`)}`);
        this.tplJSON = this.langJSON.tpl.list;
    }
    initializing() {
        this.log(chalk.bgCyan(this.tplJSON.placeholder));
        this.log(JSON.stringify(templateConfig, null, 4));
    }
    end() {}
};
