/* eslint-disable */
import { createApp } from "vue";
import router from "./router";
import store from "./store";
import App from "./App.vue";
import VueSocketIO from "vue-3-socket.io";
import SocketIO from "socket.io-client";
import "./global/global.css";

const socketConnection = SocketIO("http://localhost:5000/");
createApp(App)
    .use(store)
    .use(
        new VueSocketIO({
            debug: true,
            connection: socketConnection,
            vuex: {
                store,
                actionPrefix: "SOCKET_",
                mutationPrefix: "SOCKET_",
            },
        })
    )
    .use(router)
    .mount("#app");