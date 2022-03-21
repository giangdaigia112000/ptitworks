/* eslint-disable */
import { createRouter, createWebHistory } from "vue-router";
import HelloWorld from "../components/HelloWorld.vue";
import HomeView from "../components/HomeView.vue";
const routes = [{
        path: "/",
        name: "Homeview",
        component: HomeView,
    },
    {
        path: "/hello",
        name: "hello",
        component: HelloWorld,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;