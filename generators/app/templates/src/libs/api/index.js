'use strict';
/**
 * @file:      axios 配置文件
 * @author:    花夏(liubiao@itoxs.com)
 * @version:   V1.0.1
 * @date:      2020-10-21 20:58:53
 */
let CONTEXT_PATH = `${process.env.VUE_APP_CONTEXT_PATH}`;
export default {
    GET_TEST: CONTEXT_PATH + '/test'
};
