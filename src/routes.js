import Vue from 'vue'
// import Home from './components/equipment/Home.vue';
import Login from './components/security/Login.vue';
import Equipment from './components/equipment/Equipment.vue';
import Modal from './components/shared/Modal.vue';
import vueRouter from 'vue-router';
import { eventBus } from "./main";



Vue.use(vueRouter);

function guardRoute(to, from, next) {
    var userToken = JSON.parse(localStorage.getItem('hello'))
    if (!userToken) {
        next('/login')
    } else {
        eventBus.$emit("isAuthenticated", true);
        next()
    }
}

export const routes = [
    {
        path: '', component: Equipment,
        beforeEnter: guardRoute
    },
    { path: '/Login', component: Login },

    {
        path: '/equipment', component: Equipment,
        beforeEnter: guardRoute
    },
    {
        path: '/Modal', component: Modal,
        beforeEnter: guardRoute
    }
];