/**
 * @File:      脚手架logo
 * @Author:    花夏(liubiao@itoxs.com)
 * @Version:   V1.0.0
 * @Date:      2020-10-21 17:44:11
 */
const figlet = require('figlet');
const chalk = require('chalk');
function LOGO(contex) {
    const version = '';
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
    logo += '\nneed help?' + chalk.magenta('  ===>  ') + chalk.green('yo mint:h');
    if (contex) {
        logo += '\nCMD: '+ chalk.green(contex.rootGeneratorName());
    }
    return logo;
};
exports.LOGO = LOGO;
