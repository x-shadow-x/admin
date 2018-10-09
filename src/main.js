import Vue from 'vue'
import App from './App.vue'
import '@/components/iview'
import router from '@/router'

import '@/assets/css/main.css'


Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');