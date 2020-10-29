/**
 * @File:      脚手架模板配置文件下载
 * @Author:    花夏(liubiao@itoxs.com)
 * @Version:   V1.0.0
 * @Date:      2020-10-21 20:39:05
 */
const chalk = require('chalk');
const Generator = require('yeoman-generator');
const path = require('path');
module.exports = class extends Generator {
    constructor(params, opts) {
        super(params, opts);
        const generatorName = this.rootGeneratorName();
        this.ROOT = this.templatePath().split(path.sep).join('/').split(generatorName)[0] + generatorName;
        this.lang = require(`${path.join(this.ROOT, '/lang/config.json')}`).lang || 'zh-CN';
        this.langJSON = require(`${path.join(this.ROOT, `/lang/i18n/${this.lang}.json`)}`);
        this.scJSON = this.langJSON.sc;
    }
    prompting() {
        let prompt = [{
            type: 'list',
            name: 'remoteType',
            message: this.scJSON.message,
            choices: ['custom', 'default'],
            default: 'custom'
        }];
        let promptInput = [{
            type: 'input',
            name: 'customRemote',
            message: this.scJSON.input,
            default: ''
        }];
        return this.prompt(prompt)
            .then(props => {
                this.remoteType = props.remoteType;
                return props;
            })
            .then((props) => {
                if (this.remoteType === 'default') {
                    return;
                }
                return this.prompt(promptInput).then(props => {
                    this.customRemote = props.customRemote;
                    // 当处理完用户输入需要进入下一个生命周期阶段执行下载动作
                    this.customUrl = props.customRemote;
                });
            });
    }
    writing() {
        // 如果选择默认则恢复默认下载方式
        if (this.remoteType === 'default') {
            this.log(chalk.green(this.scJSON.default));
            this._default();
        } else {
            if (this.customUrl === '') {
                this.log(chalk.red(this.scJSON.empty));
                process.exit();
                return;
            }
            this._custom();
        }
    }
    _default() {
        this.fs.copyTpl(path.join(this.ROOT, '/generators/tc/default.json'), path.join(this.ROOT, '/generators/tc/config.json'));
    }
    _custom() {
        this.log(chalk.green(this.scJSON.remote));
        this.fs.copyTpl(path.join(this.ROOT, '/generators/tc/_config.json'), path.join(this.ROOT, '/generators/tc/config.json'), {
            customUrl: this.customUrl
        });
    }
    end() {
        const info = chalk.green(this.scJSON.end.done);
        this.log(info);
    }
};
