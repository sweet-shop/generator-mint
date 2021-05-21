/*
 * @Description: 新增 yo mint:tpl add 支持在模板配置文件中加入常用模板
 * @Version: V1.0.0
 * @Author: liubiao@itoxs.com
 * @Date: Fri May 14 2021 11:10:12
 * @LastEditors: Last commit by
 * @LastEditTime: Fri May 14 2021 15:46:09
 */
const chalk = require('chalk');
const Generator = require('yeoman-generator');
const fs = require('fs');
const os = require('os');
const path = require('path');
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
        this.tplJSON = this.langJSON.tpl.add;
    }
    prompting() {
        const tplJSON = this.tplJSON;
        const emptyName = tplJSON.emptyName;
        const emptyUrl = tplJSON.emptyUrl;
        let promptInput = [{
            type: 'input',
            name: 'name',
            message: this.tplJSON.name,
            default: '',
            validate(input) {
                var done = this.async();
                if (input === '') {
                    // Pass the return value in the done callback
                    done(emptyName);
                    return;
                }
                done(null, true);
            }
        },{
            type: 'input',
            name: 'url',
            message: this.tplJSON.url,
            default: '',
            validate(input) {
                var done = this.async();
                if (input === '') {
                    // Pass the return value in the done callback
                    done(emptyUrl);
                    return;
                }
                done(null, true);
            }
        }];
        return this.prompt(promptInput)
            .then(props => {
                this.name = props.name;
                this.url = props.url;
                return props;
            });
    }
    writing() {
        this._setTemplateConfig();
    }
    _setTemplateConfig() {
        const conf = templateConfig.getTemplateConfigOfJson();
        const TPL_CON = [].concat(conf);
        const NEW_TPL = {
            name: this.name,
            url: this.url
        };
        TPL_CON.unshift(NEW_TPL);
        const TPL_CON_STR = `/**
 * @File:      克隆远程仓库模板配置
 * @Author:    花夏(liubiao@itoxs.com)
 * @Version:   V1.0.0
 * @Date:      2020-10-23 11:27:32
 * @LastEditors: ${this.currentUsername}
 * @LastEditTime: ${$dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss') }
 */
module.exports = ${JSON.stringify(TPL_CON)};`;
        fs.writeFile(
            path.join(this.ROOT, '/generators/app/templateConfig.js'),
            TPL_CON_STR,
            { encoding: 'utf8' },
            err => {
                if (err) {
                    const errInfo = chalk.red(err);
                    this.log(errInfo);
                    return;
                }
                const info = chalk.green(this.tplJSON.end.done);
                this.log(info);
                this.log(chalk.cyan(this.tplJSON.end.configInfo));
                this.log(templateConfig.getTemplateConfigOfTable(TPL_CON));
            }
        );
    }
    end() {}
};
