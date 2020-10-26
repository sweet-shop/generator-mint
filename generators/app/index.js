/**
 * @File:      任务主文件
 * @Author:    花夏(liubiao@itoxs.com)
 * @Version:   V1.0.0
 * @Date:      2020-10-21 17:40:18
 */
// 'use strict';
const Generator = require('yeoman-generator');
const ora = require('ora');
// const yosay = require('yosay');
const download = require('download-git-repo');
const copydir = require('copy-dir');
const del = require('del');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const logo = require('../../h/logo').LOGO;
const templateConfig = require('./templateConfig');
const ORA_SPINNER = {
    interval: 80,
    frames: [
      '   ⠋',
      '   ⠙',
      '   ⠚',
      '   ⠞',
      '   ⠖',
      '   ⠦',
      '   ⠴',
      '   ⠲',
      '   ⠳',
      '   ⠓'
    ]
};
module.exports = class extends Generator {
    constructor(params, opts) {
        super(params, opts);
        // 读取json文件并转换为JSON格式存起来
        this.pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '../../package.json'), 'utf8'));
        this.copySpecialFileList = [
            'package.json'
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
        this.templSrc = this.templatePath();
        // 目标目录
        this.destinationSrc = this.destinationPath();
        let folderName = path.basename(process.cwd());
        let gitConfig = require('git-config');
        let curGitUser = gitConfig.sync().user || {};
        let curUserName = curGitUser.name || '';
        let curUserEmail = curGitUser.email || '';
        let templateName = templateConfig.map(x => {return x.name});
        // 添加默认选项
        templateName.unshift('default');
        // 添加自定义选项
        templateName.push('custom');
        let promptInit = [{
            type: 'list',
            name: '🥗 选择的模板是：',
            message: '🍟 请选择模板?',
            choices: templateName,
            default: 'default'
        }];
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
            choices: ['Apache-2.0', 'GPL-V3.0', 'ISC', 'MIT', 'MPL-2.0'],
            'store': true
        },{
            'type': 'input',
            'name': 'isSupportGit',
            'message': '是否支持git?',
            'default': 'Y/n',
            'store': true
        }];
        return this.prompt(promptInit)
            .then(initProps => {
                // this.log(initProps);
                // this.log(Object.keys(initProps)[0], initProps[Object.keys(initProps)[0]]);
                return initProps;
            })
            .then((initProps) => {
                const templateName = initProps[Object.keys(initProps)[0]];
                this.choiceTemplateName = templateName;
                if (templateName === 'default') {
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
                } else if (templateName === 'custom') {
                    // 自定义选项询问
                    const customPrompts = [
                        {
                            'type': 'input',
                            'name': 'customRemote',
                            'message': '🐝 请输入您的自定义模板的git路径',
                            'default': ''
                        }
                    ];
                    return this.prompt(customPrompts).then(props => {
                        // 当处理完用户输入需要进入下一个生命周期阶段执行下载动作
                        this.customUrl = props.customRemote;
                    });
                }
                return;
            });
    }
    writing() {
        if (this.choiceTemplateName === 'default') {
            this._copy();
        } else {
            this._downloadTemplate();
        }
    }
    _copy() {
        const me = this;
        const done = this.async();
        this.spinner = ora({
            text: `😋 Start Copy template from default template \n`,
            spinner: ORA_SPINNER
        }).start();
        // 拷贝特殊处理文件
        this._copySpecialFile();
        // 拷贝文件夹以及普通文件
        copydir(this.templSrc, this.destinationSrc, {
            filter: function (stat, filepath, filename) {
                // do not want copy files
                if (stat === 'file'
                    && me.copySpecialFileList.indexOf(filename) > -1) {
                        return false;
                }
                // do not want copy .svn directories
                if (stat === 'directory'
                    && (filename === '.svn' || filename === '.git')) {
                    return false;
                }
                // do not want copy symbolicLink directories
                // if (stat === 'symbolicLink') {
                //     return false;
                // }
                // remind to return a true value when file check passed.
                return true;
            }
        }, function(err){
            if(err) {
                me.spinner.stopAndPersist({
                    symbol: chalk.red('   X'),
                    text: `${chalk.red(err)}`
                });
                throw err;
                done();
            };
            // 删除多余文件
            const dirPath = path.join(me.destinationSrc, '');
            del([`${dirPath}/_gitignore`]);
            me.spinner.succeed(`🍺 Finish Copying template from default template`);
            done();
        });
    }
    _copySpecialFile() {
        this.copySpecialFileList.map(fileName => {
            this.fs.copyTpl(this.templatePath(fileName), this.destinationPath(fileName), {
                packageName: this.packageName,
                version: this.version,
                author: this.author,
                email: this.email,
                License: this.License
            });
        });
        // 复制 LICENSE
        this.fs.copyTpl(this.templatePath(`../license/${this.License}_LICENSE`), this.destinationPath('LICENSE'));
        // 需要单独复制的文件
        this.fs.copyTpl(this.templatePath('_gitignore'), this.destinationPath('.gitignore'));
    }
    _downloadTemplate() {
        const me = this;
        const done = this.async();
        const template = templateConfig.filter(item => item.name === this.choiceTemplateName)[0];
        const templateUrl = this.choiceTemplateName === 'custom'
                            ? this.customUrl
                            : template.url;
        const dirPath = path.join(this.destinationSrc, '/.temp');
        this.spinner = ora({
            text: `😋 Start remote download from ${templateUrl} \n`,
            spinner: ORA_SPINNER
        }).start();
        download(`direct:${templateUrl}`, dirPath, { clone: true }, err => {
            if (err) {
                me.spinner.fail(`${chalk.red(err)}`);
                process.exit();
            }
            // 拷贝文件夹以及普通文件
            copydir(dirPath, this.destinationSrc, {
                filter: function (stat, filepath, filename) {
                    // do not want copy files
                    // if (stat === 'file'
                    //     && me.copySpecialFileList.indexOf(filename) > -1) {
                    //     return false;
                    // }
                    // do not want copy .svn directories
                    if (stat === 'directory'
                        && (filename === '.svn' || filename === '.git')) {
                        return false;
                    }
                    // do not want copy symbolicLink directories
                    // if (stat === 'symbolicLink') {
                    //     return false;
                    // }
                    // remind to return a true value when file check passed.
                    return true;
                }
            }, function (err) {
                if (err) {
                    me.spinner.stopAndPersist({
                        symbol: chalk.red('   X'),
                        text: `${chalk.red(err)}`
                    });
                    throw err;
                };
                del([`${dirPath}`]);
                me.spinner.succeed(`🍺 Finish downloading the template from ${templateUrl}`);
                done();
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
                        return this.log('🎈 ' + chalk.red('please run sudo npm install'));
                    }
                    this.log('📦 Finish installing dependencies.', chalk.green('✔'));
                });
            } else {
                console.log(chalk.red('🚗 please "run npm install" before "npm run dev" '));
                console.log(chalk.green('🎈 done!'));
                console.log(chalk.green(`🚗 please run：npm run dev`));
            }
            done();
        });
    }
    end() {
        const dir = chalk.green(this.packageName || path.basename(process.cwd()));
        const info = `🎊 Create project successfully! Now you can enter ${dir} and start to code.`;
        this.spinner.succeed(info);
        this.spinner.stop();
    }
};
