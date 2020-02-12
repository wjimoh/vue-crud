import Home from './components/Home.vue';
import Login from './components/Login.vue';
import UserTable from './components/UserTable.vue';
import Modal from './components/Modal.vue';


export const routes = [
    { path: '', component: Home },
    { path: '/Login', component: Login },
    { path: '/UserTable', component: UserTable },
    { path: '/Modal', component: Modal}
];