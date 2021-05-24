/*
 * @Description: yo mint:tpl del 指令  支持将自己删除不需要的模板
 * @Version: V1.0.0
 * @Author: liubiao@itoxs.com
 * @Date: 2021-05-21 15:33:08
 */
const chalk = require('chalk');
const Generator = require('yeoman-generator');
const fs = require('fs');
var os = require('os');
const path = require('path');
const $dayjs = require('dayjs');
const templateConfig = require('../../lib/getTemplateConfig');
module.exports = class extends Generator {
    constructor(params, opts) {
        super(params, opts);
        const generatorName = this.rootGeneratorName();
        const userInfo = os.userInfo();
        this.len = templateConfig.getTemplateConfigOfJson().length;
        this.currentUsername = userInfo.username;
        this.ROOT = this.templatePath().split(path.sep).join('/').split(generatorName)[0] + generatorName;
        this.lang = require(`${path.join(this.ROOT, '/lang/config.json')}`).lang || 'zh-CN';
        this.langJSON = require(`${path.join(this.ROOT, `/lang/i18n/${this.lang}.json`)}`);
        this.tplJSON = this.langJSON.tpl.del;
        this.log(templateConfig.getTemplateConfigOfTable());
    }
    prompting() {
        const me = this;
        const tplJSON = this.tplJSON;
        let promptInput = [{
            type: 'input',
            name: 'curIndex',
            message: tplJSON.index,
            default: '',
            validate(input) {
                var done = this.async();
                let num = input;
                me._checkedNum(num, done);
                done(null, true);
            }
        }];
        return this.prompt(promptInput)
            .then(props => {
                this.index = props.index;
                return props;
            });
    }
    _checkedNum(num, done) {
        const tplJSON = this.tplJSON;
        const emptyNum = tplJSON.emptyNum;
        const exceedNumMax = tplJSON.exceedNumMax;
        const exceedNumMin = tplJSON.exceedNumMin;
        if (isNaN(num)) {
            done(emptyNum);
            return;
        } else {
            num -= 1;
            if (num >= this.len) {
                done(exceedNumMax + ' ' + this.len);
                return;
            } else if (num < 0) {
                done(exceedNumMin + ' ' + 0);
                return;
            }
        }
    }
    writing() {
        this._delTemplateConfig();
    }
    _delTemplateConfig() {
        const conf = templateConfig.getTemplateConfigOfJson();
        const TPL_CON = [].concat(conf);
        TPL_CON.splice(this.index - 1, 1);
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
