/**
 * @File:      脚手架i18n入口文件
 * @Author:    花夏(liubiao@itoxs.com)
 * @Version:   V1.0.0
 * @Date:      2020-10-27 09:03:22
 */
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const Generator = require('yeoman-generator');
const del = require('del');
const logo = require('../h/logo').LOGO;
module.exports = class extends Generator {
    constructor(params, opts) {
        super(params, opts);
        // 获取模板路径
        this.templSrc = this.templatePath();
        this.lang = require(`${path.join(this.templSrc, '../config.json')}`).lang || 'zh-CN';
        this.langJSON = require(`${path.join(this.templSrc, `../i18n/${this.lang}.json`)}`);
    }
    prompting() {
        this.log(this.langJSON.root.welcome);
        // Have Yeoman greet the user.
        this.log(
            logo(this)
        );
        this.log();
        const i18nFiles = this._readDirectoryFileName(`${path.join(this.templSrc, '../i18n')}`);
        const i18nChoices = i18nFiles.map(item => item.split('.json')[0]);
        this.default = this.langJSON.lang.prompt.default;
        i18nChoices.unshift(this.default);
        let prompt = [{
            type: 'list',
            name: 'lang',
            message: `🏳️‍🌈 ${this.langJSON.lang.prompt.lang}`,
            choices: i18nChoices,
            default: this.default
        }];
        return this.prompt(prompt)
            .then((props) => {
                const lang = props.lang;
                console.log(lang);
                this.choicesLang = lang;
                return;
            });
    }
    writing() {
        this.fs.copyTpl(this.templatePath('../_config.json'), this.templatePath('../config.json'), {
            lang: this.choicesLang === '默认(中文)' ? 'zh-CN' : this.choicesLang
        });
    }
    end() {}
    /**
     * 读取指定文件夹下根的所有文件名称
     * @param {String} path 指定绝对目录
     */
    _readDirectoryFileName(path) {
        let filesName = []
        const files = fs.readdirSync(path);
        files.forEach(function (item, index) {
            let stat = fs.lstatSync(`${path}/${item}`)
            if (!stat.isDirectory()) { 
                filesName.push(item);
            }
        })
        return filesName;
    }
};
