import Vue from 'vue'
import Router from 'vue-router'
import Trombinoscope from '@/components/Trombinoscope'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Trombinoscope',
      component: Trombinoscope
    }
  ]
})
