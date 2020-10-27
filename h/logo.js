/**
 * @File:      脚手架logo
 * @Author:    花夏(liubiao@itoxs.com)
 * @Version:   V1.0.0
 * @Date:      2020-10-21 17:44:11
 */
const figlet = require('figlet');
const chalk = require('chalk');
const path = require('path');
function LOGO(contex) {
    const version = '';
    contex.ROOT = contex.templatePath().split(path.sep).filter((path, index) => index < 3).join('/');
    // 获取模板路径
    contex.templSrc = contex.templatePath();
    contex.lang = require(`${path.join(contex.ROOT, '/lang/config.json')}`).lang || 'zh-CN';
    contex.langJSON = require(`${path.join(contex.ROOT, `/lang/i18n/${contex.lang}.json`)}`);
    contex.logoJSON = contex.langJSON.logo;
    try{
        version = contex ? 'v' + contex.pkg.version : '';
    }
    catch (e) {}
    let logo = 'mint';
    const fontOptionsValue = {
        font: 'Standard',
        horizontalLayout: 'default',
        verticalLayout: 'default'
    };
    const logoValue = figlet.textSync(logo, fontOptionsValue);
    logo = chalk
            .keyword('cyan')
            .bold(logoValue);
    logo += `\n${contex.logoJSON.needHelp}` + chalk.magenta('  ===>  ') + chalk.green('yo mint:h');
    if (contex) {
        logo += '\nCMD: '+ chalk.green(contex.rootGeneratorName());
    }
    return logo;
};
exports.LOGO = LOGO;
