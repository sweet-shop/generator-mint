/**
 * @File:      任务主文件
 * @Author:    花夏(liubiao@itoxs.com)
 * @Version:   V1.0.0
 * @Date:      2020-10-21 17:40:18
 */
// 'use strict';
const Generator = require('yeoman-generator');
// const yosay = require('yosay');
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
    }
    prompting() {
        this.log(`🌺 Welcome to the ${chalk.red('generator-mint')} generator!`);
        // Have Yeoman greet the user.
        this.log(
            logo(this)
        );
        this.log();
        // 获取当前文件夹名称
        let folderName = path.basename(process.cwd());
        let gitConfig = require('git-config');
        let curGitUser = gitConfig.sync().user || {};
        let curUserName = curGitUser.name || '';
        let curUserEmail = curGitUser.email || '';
        let prompts = [{
            'name'   : 'projectName',
            'message': 'Name of Project?',
            'default': folderName,
            'warning': ''
        }, {
            'name'   : 'version',
            'message': 'Version:',
            'default': '1.0.0',
            'warning': ''
        }, {
            'name'   : 'author',
            'message': 'Author Name:',
            'default': curUserName,
            'warning': ''
        },
        {
            'name'   : 'email',
            'message': 'Author Email:',
            'default': curUserEmail,
            'warning': ''
        },
        {
            type: 'list',
            name: 'License',
            message: 'Please choose license:',
            choices: ['MIT', 'ISC', 'Apache-2.0', 'AGPL-3.0']
        },{
            'type': 'input',
            'name': 'isSupportGit',
            'message': '是否支持git?',
            'default': 'Y/n'
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
        this.fs.copyTpl(this.templatePath('package.json'), this.destinationPath('package.json'), {
            packageName: this.packageName,
            version: this.version,
            author: this.author,
            email: this.email,
            License: this.License
        });
    }
    install() {
        const done = this.async();
        this.prompt([
            {
                'name'   : 'npm_install',
                'message': 'Install node_modules for npm run dev now?',
                'default': 'N/y',
                'warning': ''
            }
        ]).then(props => {
            this.isNpmInstall = (/^y/i).test(props.npm_install);
            if (this.isNpmInstall) {
                this.installDependencies('', {}, function (err) {
                    if (err) {
                        return this.log('🎈' + chalk.red('please run "sudo npm install"'));
                    }
                    console.log(chalk.green('🌈 npm was installed successful.'));
                });
            } else {
                console.log(chalk.red('🚗 please run "npm install" before npm run dev'));
                console.log(chalk.green('🎈 done!'));
                console.log(chalk.green(`🚗 cd ${this.packageName}：npm run dev`));
            }
            done();
        });
    }
    end() {
        const dir = chalk.green(this.packageName);
        const info = `🎊 Create project successfully! Now you can enter ${dir} and start to code.`;
        this.log('📦 Finish installing dependencies.', chalk.green('✔'));
        this.log();
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
