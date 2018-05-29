import Vue from 'vue';
import Router from 'vue-router';
import Feed from '../components/Feed';
import Player from '../components/Player';
import About from '../components/About';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Feed',
      component: Feed,
    },
    {
      path: '/:id',
      name: 'Player',
      component: Player,
    },
    {
      path: '/about',
      name: 'About',
      component: About,
    },
  ],
});
