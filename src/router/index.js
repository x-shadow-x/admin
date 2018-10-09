import Vue from 'vue'
import PageRouter from './page-router'
import routes from './router'

Vue.use(PageRouter);

const router = new PageRouter({
    mode: 'history',
    routes: routes
});

router.beforeEach((to, from, next) => {
    next();
});

export default router;

export const PM = router.pm;