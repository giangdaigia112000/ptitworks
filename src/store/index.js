/* eslint-disable */
import { createStore } from "vuex";

export default createStore({
    state: {
        value: "",
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