/* eslint-disable */
import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../pages/LoginView.vue";
import RegisterView from "../pages/RegisterView.vue";
import HomeView from "../pages/HomeView.vue";
import ProfileView from "../pages/ProfileView.vue";
import NotFound from "../pages/404Notfound.vue";
import ProjectsView from "../components/ProjectsView.vue";
import ProjectDetail from "../components/ProjectDetail.vue";
import HomeMain from "../components/HomeMain.vue";
import store from "../store";
import axios from "axios";
const routes = [{
        path: "/",
        name: "Homeview",
        component: HomeView,
        meta: { requiresAuth: true },
        children: [{
                path: "/",
                name: "homemain",
                component: HomeMain,
                meta: { requiresAuth: true },
            },
            {
                path: "/du-an",
                name: "project",
                component: ProjectsView,
                meta: { requiresAuth: true },
            },
            {
                path: "/du-an-chi-tiet/:id",
                name: "projectdetail",
                component: ProjectDetail,
                meta: { requiresAuth: true },
            },
            {
                path: "/phieu-yeu-cau",
                name: "eform",
                component: ProjectDetail,
                meta: { requiresAuth: true },
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
        meta: { requiresAuth: true },
    },
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: NotFound,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach(async(to, from, next) => {
    const user = store.state.user;
    const token = localStorage.getItem("token");
    if (to.matched.some((record) => record.meta.requiresAuth) && user == null) {
        if (token) {
            const url = store.state.api;
            const res = await axios.post(`${url}/checktoken`, {
                token: token,
            });
            console.log(res.data);
            if (res.data.user) {
                store.state.user = res.data.user;
                return next({ path: "/" });
            } else {
                localStorage.removeItem("token");
                return next("/dang-nhap");
            }
        }
        return next("/dang-nhap");
    } else if (
        (to.path == "/dang-nhap" && token != null) ||
        (to.path == "/dang-ky" && token != null)
    ) {
        return next({ path: "/" });
    }
    next();
});

export default router;
