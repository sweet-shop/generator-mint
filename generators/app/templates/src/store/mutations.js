/**
 * @file:      mutations
 * @author:    花夏(liubiao@itoxs.com)
 * @version:   V1.0.0
 * @date:      2020-10-21 21:02:45
 */
import * as types from './mutation-type';
const mutations = {
    [types.SET_TEST](state, test) {
        state.test = test;
    }
};
export default mutations;
