/**
 * @File:      脚手架help
 * @Author:    花夏(liubiao@itoxs.com)
 * @Version:   V1.0.0
 * @Date:      2020-10-21 20:39:05
 */
const os = require('os');
const path = require('path');
const fs = require('fs');
const process = require('process');
const chalk = require('chalk');
const Generator = require('yeoman-generator');
const logo = require('../h/logo').LOGO;
module.exports = class extends Generator {
    constructor(params, opts) {
        super(params, opts);
        // 获取模板路径
        this.templSrc = this.templatePath();
        this.lang = require(`${path.join(this.templSrc, '../../lang/config.json')}`).lang || 'zh-CN';
        this.langJSON = require(`${path.join(this.templSrc, `../../lang/i18n/${this.lang}.json`)}`);
        this.h = this.langJSON.h;
    }
    echoHelp() {
        this.pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8'));
        this.log(logo(this));
        var txt = [
            '',
            'mint@v' + chalk.green(this.pkg.version),
            'node@v' + chalk.yellow(process.version.substring(1)),
            'os@' + chalk.cyan(os.type() + ' ' + os.release()),
            '',
            `${this.h.yo.title}`,
            chalk.green(`${this.h.yo.implement}`),
            chalk.magenta(`${this.h.yo.help}`),
            chalk.cyan(`${this.h.yo.lang}`),
            chalk.yellow(`${this.h.yo.tc}`),
            chalk.gray(`${this.h.yo.sc}`),
            `${this.h.project.title}`,
            chalk.green(`${this.h.project.startUp}`),
            chalk.yellow(`${this.h.project.build}`),
            chalk.cyan(`${this.h.project.lint}`),
            '',
            '', 
            `${this.h.root.doc} ${chalk.underline('https://github.com/sweet-shop/generator-mint')}`,
            `${this.h.root.author}`
        ].join('\n');
        this.log(txt);
    };
};
