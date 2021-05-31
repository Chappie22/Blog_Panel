import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {store} from '@/store'
import axios from "axios";

Vue.config.productionTip = false;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');

// /* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   store,
//   components: { App },
//   template: '<App/>'
// })