import Vue from 'vue';
import Router from 'vue-router';
import Trombinoscope from '../components/Trombinoscope';
import Unauthorized from '../components/Unauthorized';

import store from '../store';

import security from '../components/security';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'Trombinoscope',
    component: Trombinoscope,
    meta: { requiresAuth: true }
  },
  {
    path: '/unauthorized',
    name: 'Unauthorized',
    component: Unauthorized,
    meta: { requiresAuth: true }
  }
];

const router = new Router({
  routes,
  mode: 'history'
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const auth = store.state.security.auth;
    if (!auth.authenticated) {
      security.init(next, to.meta.roles);
    } else {
      if (to.meta.roles) {
        if (security.roles(to.meta.roles[0])) {
          next();
        } else {
          next({ name: 'Unauthorized' });
        }
      } else {
        next();
      }
    }
  } else {
    next();
  }
});

export default router;
