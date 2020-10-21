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
    }
    echoHelp() {
        this.pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8'));
        console.log(logo(this));
        var txt = [
            '',
            'mint@v' + chalk.green(this.pkg.version),
            'node@v' + chalk.yellow(process.version.substring(1)),
            'os@' + chalk.blue(os.type() + ' ' + os.release()),
            '',
            'Yeoman 命令',
            chalk.magenta('   yo mint:h       显示帮助'),
            chalk.green('   yo mint         在根目录执行，初始化Project'),
            '项目 命令',
            chalk.green('   npm run dev   本地开发启动命令'),
            chalk.yellow('   npm run build 本地build'),
            chalk.cyan('   npm run lint  本地eslint检测'),
            '',
            '',
            '工具文档：https://github.com/huarxia/generator-mint',
            'author by @花夏 liubiao@itoxs.com'
        ].join('\n');
        console.log(txt);
    };
};