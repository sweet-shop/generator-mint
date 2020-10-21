import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import instance from './libs/request';
import api from './libs/api/';
import ViewUI from 'view-design';
import dayjs from 'dayjs';
import $$Spin from './install/Spin';
import util from './libs/utils';
import './assets/css/common.less';
Vue.prototype.$http = instance;
Vue.prototype.$api = api;
Vue.prototype.$dayjs = dayjs;
Vue.use(ViewUI);
Vue.use($$Spin);
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
