/* eslint-disable */
import { createStore } from "vuex";

export default createStore({
    state: {
        value: "test",
        api: "https://ptitword-thcs-cotam.herokuapp.com",
        api2: "https://thunder-chipped-mule.glitch.me",
        search: "",
        user: null,
        project: null,
        task: null,
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