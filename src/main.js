import Vue from 'vue'
import VueResource from 'vue-resource';
import vueRouter from 'vue-router';
import App from './App.vue'
import { routes } from './routes';

Vue.use(VueResource);
Vue.use(vueRouter);

const HelloJs = require('hellojs/dist/hello.all.min.js');
const VueHello = require('vue-hellojs');

HelloJs.init({
  google: '408887561229-s4btg63f7run7mjv31o287suuur8p7af.apps.googleusercontent.com'
  //google: 'AIzaSyC2Tkp29qyoWb81bl8Zdp_LqcnZepti0nM',
  //facebook: FACEBOOK_APP_CLIENT_ID
}, {
  redirect_uri: 'authcallback/'
});

Vue.use(VueHello, HelloJs);

export const eventBus = new Vue()

const router = new vueRouter({
  routes
});


Vue.config.productionTip = false

new Vue({
  router: router,
  render: h => h(App),
  
  errorMsg: false,
  successMsg: false
 
}).$mount('#app')
