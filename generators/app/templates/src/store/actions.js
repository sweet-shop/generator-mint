/**
 * @file:      actions
 * @author:    花夏(liubiao@itoxs.com)
 * @version:   V1.0.0
 * @date:      2020-10-21 21:01:39
 */
import * as types from './mutation-type';

const actions = {
    [types.SET_TEST]({ commit }) {
        return new Promise(resolve => {
            commit(types.SET_TEST);
            resolve();
        });
    }
};
export default actions;
