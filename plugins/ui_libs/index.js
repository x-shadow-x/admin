import Vue from 'vue'
import iView from 'iview'
import { VTable, VPagination } from 'vue-easytable'

Vue.use(iView);

Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)
