import { createRouter, createWebHashHistory } from "vue-router";
import { useAuthStore, storeToRefs } from "./store/pinia";
import Home from "./views/Home.vue";
import NotFound from "./views/NotFound.vue";
import Register from "./views/Register.vue";
import Login from "./views/Login.vue";
import Stats from "./views/Stats.vue";
import Challenges from "./views/Challenges.vue";

const routes = [
    { path: "/home", name: "home", meta: { requiresAuth: true }, component: Home },
    { path: "/stats", name: "stats", meta: { requiresAuth: true }, component: Stats },
    { path: "/account", name: "account", meta: { requiresAuth: true } },
    { path: "/challenges", name: "challenges", meta: { requiresAuth: true }, component: Challenges },
    { path: "/register", name: "register", meta: {}, component: Register },
    { path: "/", name: "login", meta: {}, component: Login },
    { path: "/:catchAll(.*)", name: "404", component: NotFound },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to) => {
    const auth = useAuthStore();
    let { isAuthenticated, errorMessage } = storeToRefs(auth);
    errorMessage.value = "";

    if (!isAuthenticated.value && to.meta.requiresAuth) {
        return { name: "login" };
    }
});

export default router;
