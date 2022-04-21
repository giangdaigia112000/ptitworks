/* eslint-disable */
import { createRouter, createWebHistory } from "vue-router";
import store from "../store";
import axios from "axios";
const routes = [{
        path: "/",
        name: "Homeview",
        component: () =>
            import ("../pages/HomeView.vue"),
        meta: { requiresAuth: true },
        children: [{
                path: "/",
                name: "homemain",
                component: () =>
                    import ("../pages/HomeMain.vue"),
                meta: { requiresAuth: true },
            },
            {
                path: "/du-an",
                name: "project",
                component: () =>
                    import ("../pages/ProjectsView.vue"),
                meta: { requiresAuth: true },
            },
            {
                path: "/du-an-chi-tiet/:id",
                name: "projectdetail",
                component: () =>
                    import ("../components/ProjectDetail.vue"),
                meta: { requiresAuth: true },
                children: [{
                        path: "/du-an-chi-tiet/:id/",
                        name: "listtask",
                        component: () =>
                            import ("../components/ListTask.vue"),
                        meta: { requiresAuth: true },
                    },
                    {
                        path: "/du-an-chi-tiet/:id/tin-nhan",
                        name: "messenger",
                        component: () =>
                            import ("../components/MessengerView.vue"),
                        meta: { requiresAuth: true },
                    },
                    {
                        path: "/du-an-chi-tiet/:id/bieu-do",
                        name: "chart",
                        component: () =>
                            import ("../components/ChartView.vue"),
                        meta: { requiresAuth: true },
                    },
                ],
            },
            {
                path: "/phieu-yeu-cau",
                name: "eform",
                component: () =>
                    import ("../pages/EformView.vue"),
                meta: { requiresAuth: true },
            },
        ],
    },
    {
        path: "/dang-nhap",
        name: "login",
        component: () =>
            import ("../pages/LoginView.vue"),
    },
    {
        path: "/dang-ky",
        name: "register",
        component: () =>
            import ("../pages/RegisterView.vue"),
    },
    {
        path: "/ho-so",
        name: "profile",
        component: () =>
            import ("../pages/ProfileView.vue"),
        meta: { requiresAuth: true },
    },
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: () =>
            import ("../pages/404Notfound.vue"),
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