/**
 * @File:      脚手架logo
 * @Author:    花夏(liubiao@itoxs.com)
 * @Version:   V1.0.0
 * @Date:      2020-10-21 17:44:11
 */

const chalk = require('chalk');
const chalklet = require('chalklet')
function LOGO(contex) {
    const version = '';
    try{
        version = contex ? 'v' + contex.pkg.version : '';
    }
    catch (e) {}
    // let logo = Alphabet('mint', 'stereo');
    let logo = 'mint';
    const colorOptions = {
        type: 'hex',
        text: { value: '#c8ff75' },
        bg: { value: '#0d0d0d' }
    };
    logo = chalklet.generate(logo, colorOptions);
    logo += '\nneed help?' + chalk.magenta('  ===>  ') + chalk.green('yo mint:h');
    if (contex) {
        logo += '\nCMD: '+ chalk.green(contex.rootGeneratorName());
    }
    return logo;
};
exports.LOGO = LOGO;