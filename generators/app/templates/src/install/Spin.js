/**
 * @file:      全局加载中间件
 * @author:    花夏(liubiao@itoxs.com)
 * @version:   V1.0.0
 * @date:      2020-02-18 15:53:35
 */
import { Spin } from 'view-design';
const install = function(Vue, options) {
    Vue.prototype.$$Spin = {
        show(text) {
            Spin.show({
                render: h => {
                    return h('div', [
                        h('Icon', {
                            class: 'custom-spin-icon-load',
                            props: {
                                type: 'ios-loading',
                                size: 18
                            }
                        }),
                        h('div', text || '加载中...')
                    ]);
                }
            });
        },
        hide() {
            Spin.hide();
        }
    };
};
export default install;
