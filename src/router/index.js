import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from '@/views/Main.vue';
import User from '@/views/User';
import Home from '@/views/Home';
import Mall from '@/views/Mall';
import Page1 from '@/views/Other/Page1';
import Page2 from '@/views/Other/Page2';
import Login from '@/views/Login/Login';
Vue.use(VueRouter);
const routes = [
    {
        path: "/",
        name: "main",
        redirect: "/home",
        component: Main,
        children: [
            // {
            //     path: "/home",
            //     name: "home",
            //     component: Home
            // },
            // {
            //     path: "/user",
            //     name: "user",
            //     component: User
            // },
            // {
            //     path: "/mall",
            //     name: "mall",
            //     component: Mall
            // },
            // {
            //     path: "/page1",
            //     name: "page1",
            //     component: Page1
            // },
            // {
            //     path: "/page2",
            //     name: "page2",
            //     component: Page2
            // }
        ]
    },
    {
        path:"/login",
        name:"login",
        component:Login
    }

];

export default new VueRouter({
    mode: "history",
    routes
})