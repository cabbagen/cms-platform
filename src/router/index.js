import VueRouter from 'vue-router';
import routes from './routes';

const router = new VueRouter({
    routes,
    mode: 'history',
    base: process.env.VUE_APP_ROUTER_PREFIX,
});

router.beforeEach((to, _, next) => {
    const token = sessionStorage.getItem('token');

    if (!token && to.name !== 'login') {
        next('/login');
        return;
    }
    next();
});

export default router;
