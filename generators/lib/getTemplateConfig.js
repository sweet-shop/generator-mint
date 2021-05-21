/*
 * @Description: 获取模板配置
 * @Version: V1.0.0
 * @Author: liubiao@itoxs.com
 * @Date: 2021-05-21 14:16:17
 */
const chalk = require('chalk');
const path = require('path');
const WordTable = require('word-table');
const templateConfig = require('../app/templateConfig');
module.exports = {
    getTemplateConfigOfJson() {
        return templateConfig;
    },
    getTemplateConfigOfTable(tplConf) {
        const configJson = path.resolve(__dirname, '../../lang');
        this.lang = require(`${configJson}/config.json`).lang || 'zh-CN';
        this.langJSON = require(`${configJson}/i18n/${this.lang}.json`);
        this.tplJSON = this.langJSON.tpl;
        const header = [
            this.tplJSON.tpl_table_index,
            this.tplJSON.tpl_table_name,
            this.tplJSON.tpl_table_url
        ];
        const body = [];
        tplConf = tplConf || templateConfig;
        tplConf.forEach((item, index) => {
            body.push([
                index + 1,
                item.name,
                item.url
            ]);
        });
        var wt = new WordTable(header, body);
        return wt.string();
    }
};