import Vue from 'vue'
import App from './App.vue'
import axios from 'axios';
import Router from 'vue-router';
import 'bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';

Vue.use(Router);

Vue.config.productionTip = false

window.axios = axios;

import ListMovies from './components/ListMovies.vue';
import DetailsMovie from './components/DetailsMovie.vue';

const router = new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
        path: '/',
        component: ListMovies,
        name: 'ListMovies'
    },
    {
      path: '/details',
      component: DetailsMovie,
      name: 'DetailsMovie'
    },
  ]
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
