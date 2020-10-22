/**
 * @File:      任务主文件
 * @Author:    花夏(liubiao@itoxs.com)
 * @Version:   V1.0.0
 * @Date:      2020-10-21 17:40:18
 */
// 'use strict';
const Generator = require('yeoman-generator');
// const yosay = require('yosay');
const copy = require('recursive-copy');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const logo = require('../../h/logo').LOGO;
const boxen = require('boxen');
const BOXEN_OPTS = {
    padding: 1,
    margin: 1,
    align: "center",
    borderColor: "yellow",
    borderStyle: "round"
};
module.exports = class extends Generator {
    constructor(params, opts) {
        super(params, opts);
        // 读取json文件并转换为JSON格式存起来
        this.pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '../../package.json'), 'utf8'));
        this.copyFileList = [
            '.browserslistrc',
            '.editorconfig',
            '.env',
            '.env.development',
            '.env.production',
            '.env.release',
            '.env.testing',
            '.eslintignore',
            '.eslintrc.js',
            '.gitignore',
            '.prettierignore',
            '.prettierrc.json',
            '.stylelintignore',
            '.stylelintrc.js',
            'babel.config.js',
            'LICENSE',
            'Makefile',
            'package.json',
            'README.md',
            'vue.config.js'
        ];
        this.directoryList = [
            '.githooks',
            'config',
            'mock',
            'public',
            'src'
        ];
    }
    prompting() {
        this.log(`🌺 Welcome to the ${chalk.red('generator-mint')} generator!`);
        // Have Yeoman greet the user.
        this.log(
            logo(this)
        );
        this.log();
        // 获取模板路径
        this.templSrc = this.templatePath('package.json').split('package.json')[0];
        let folderName = path.basename(process.cwd());
        let gitConfig = require('git-config');
        let curGitUser = gitConfig.sync().user || {};
        let curUserName = curGitUser.name || '';
        let curUserEmail = curGitUser.email || '';
        let prompts = [{
            'name'   : 'projectName',
            'message': 'Name of Project?',
            'default': folderName,
            'warning': '',
            'store': true
        }, {
            'name'   : 'version',
            'message': 'Version:',
            'default': '1.0.0',
            'warning': '',
            'store': true
        }, {
            'name'   : 'author',
            'message': 'Author Name:',
            'default': curUserName,
            'warning': '',
            'store': true
        },
        {
            'name'   : 'email',
            'message': 'Author Email:',
            'default': curUserEmail,
            'warning': '',
            'store': true
        },
        {
            type: 'list',
            name: 'License',
            message: 'Please choose license:',
            choices: ['MIT', 'ISC', 'Apache-2.0', 'AGPL-3.0'],
            'store': true
        },{
            'type': 'input',
            'name': 'isSupportGit',
            'message': '是否支持git?',
            'default': 'Y/n',
            'store': true
        }];
        // 当处理完用户输入需要进入下一个生命周期阶段时必须调用这个方法
        return this.prompt(prompts).then(props => {
            // 当处理完用户输入需要进入下一个生命周期阶段时必须调用这个方法
            this.packageName = props.projectName;
            this.version = props.version;
            this.author = props.author;
            this.email = props.email;
            this.License = props.License;
            this.isSupportGit = /^y/i.test(props.isSupportGit);
            this.props = props;
        });
    }
    writing() {
        this._copy();
    }
    _copy() {
        this._copyFile();
        this._copyDirectory();
    }
    _copyDirectory() {
        const done = this.async();
        this.directoryList.map((directory, index, arr) => {
            copy(path.join(this.templSrc, directory), path.join(process.cwd(), directory))
                .then(function(results) {
                    console.info('🌈Copied ' + chalk.cyan(directory) + ' successful.');
                    if (index + 1 === arr.length) {
                        done();
                    }
                })
                .catch(function(error) {
                    console.error(chalk.red('Copy failed: ') + error);
                    done();
                });
        });
    }
    _copyFile() {
        this.copyFileList.map(fileName => {
            this.fs.copyTpl(this.templatePath(fileName), this.destinationPath(fileName), {
                packageName: this.packageName,
                version: this.version,
                author: this.author,
                email: this.email,
                License: this.License
            });
        });
    }
    install() {
        const done = this.async();
        this.prompt([
            {
                'name'   : 'npm_install',
                'message': '🚀 Install node_modules for npm run dev now?',
                'default': 'N/y',
                'warning': ''
            }
        ]).then(props => {
            this.isNpmInstall = (/^y/i).test(props.npm_install);
            if (this.isNpmInstall) {
                this.installDependencies('', {}, function (err) {
                    if (err) {
                        return this.log('🎈' + chalk.red('please run sudo npm install'));
                    }
                    this.log('📦 Finish installing dependencies.', chalk.green('✔'));
                });
            } else {
                console.log(chalk.red('🚗 please run npm install before npm run dev'));
                console.log(chalk.green('🎈 done!'));
                console.log(chalk.green(`🚗 please run：npm run dev`));
            }
            done();
        });
    }
    end() {
        const dir = chalk.green(this.packageName);
        const info = `🎊 Create project successfully! Now you can enter ${dir} and start to code.`;
        this.log(
            boxen(info, {
                ...BOXEN_OPTS,
                ...{
                    borderColor: 'white'
                }
            })
        );
    }
};
