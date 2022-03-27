/* eslint-disable */
import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../pages/LoginView.vue";
import RegisterView from "../pages/RegisterView.vue";
import HomeView from "../pages/HomeView.vue";
import ProfileView from "../pages/ProfileView.vue";
import NotFound from "../pages/404Notfound.vue";
import ProjectsView from "../components/ProjectsView.vue";
import ProjectDetail from "../components/ProjectDetail.vue";
import store from "../store";
const routes = [{
        path: "/",
        name: "Homeview",
        component: HomeView,
        children: [{
                path: "/",
                name: "projects",
                component: ProjectsView,
            },
            {
                path: "/du-an/:id",
                name: "projectdetail",
                component: ProjectDetail,
            },
        ],
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
    {
        path: "/ho-so",
        name: "profile",
        component: ProfileView,
    },
    { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    if (
        to.path !== "/dang-nhap" &&
        to.path !== "/dang-ky" &&
        store.state.islogin === false
    ) {
        return next({ path: "/dang-nhap" });
    } else if (
        (store.state.islogin === true && to.path === "/dang-nhap") ||
        (store.state.islogin === true && to.path === "/dang-ky")
    ) {
        return next({ path: "/" });
    }
    next();
});
export default router;
