/* eslint-disable */
import { createStore } from "vuex";

export default createStore({
    state: {
        value: "test",
        islogin: false,
        user: {
            username: "0336277758",
            password: "112000",
            name: "Nguyễn Trường Giang",
            avt: "https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-6/264016547_1271758733329800_4925686235036079872_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=itpj8AU7A4cAX-BsnCo&tn=hFadcQFm23jBc4jH&_nc_ht=scontent.fhan15-2.fna&oh=00_AT99RLFO-cdwHK9VvagpPt7FaItgdUkF-vVMpPsKgxhmOw&oe=62422CC0",
            email: "Giangdaigia001@gmail.com",
        },
    },
    getters: {
        getValue: (state) => {
            return state.value;
        },
    },
    mutations: {
        setValue: (state, newValue) => {
            state.value = newValue;
        },
    },
    actions: {
        commitSetvalue: ({ commit }, newValue) => {
            commit("setValue", newValue);
        },
    },
    modules: {},
});
