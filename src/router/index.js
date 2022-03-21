/* eslint-disable */
import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../pages/LoginView.vue";
import RegisterView from "../pages/RegisterView.vue";
import HomeView from "../pages/HomeView.vue";
const routes = [{
        path: "/",
        name: "Homeview",
        component: HomeView,
    },
    {
        path: "/dang-nhap",
        name: "login",
        component: LoginView,
    },
    {
        path: "/dang-ky",
        name: "register",
        component: RegisterView,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});
router.beforeEach((to, from, next) => {
    if (to.path !== "/dang-nhap" && to.path !== "/dang-ky") {
        return next({ path: "/dang-nhap" });
    } else next();
});
export default router;