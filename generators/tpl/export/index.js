/*
 * @Description: yo mint:tpl export 导出模板配置文件到本地
 * @Version: V1.0.0
 * @Author: liubiao@itoxs.com
 * @Date: 2021-05-21 16:56:55
 */
const chalk = require('chalk');
const Generator = require('yeoman-generator');
const path = require('path');
const templateConfig = require('../../lib/getTemplateConfig');
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
        const conTpl = templateConfig.getTemplateConfigOfTable();
        this.log(conTpl);
    }
    writing() {
        const exec = require('child_process').exec;
        exec('1.txt /select, "E:\\"')
    }
    end() {}
};
