import { defineStore } from "pinia";
import { reactive, toRefs } from "vue";
import { supabase } from "../scripts/supabase";

export const _useAuthStore = defineStore("auth", () => {
    const state = reactive({
        isLoading: false,
        isAuthenticated: false,
        errorMessage: "",
        session: {},
    });

    function commit(type, payload) {
        switch (type) {
            case "error":
                state.isLoading = false;
                state.errorMessage = payload.error;
                break;
            case "success":
                state.isLoading = false;
                state.isAuthenticated = true;
                break;
        }
    }

    const signInWithPassword = async ({ email, password }) => {
        state.isLoading = true;
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        console.log({ data, error });
        if (error) {
            commit("error", { error });
            return;
        }
        commit("success");
    };

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            commit("error", { error });
            return;
        }
        state.isAuthenticated = false;
        // reset data state
    };

    const signUp = async ({ email, password }) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });
        if (error) {
            commit("error", { error });
            return;
        }
        commit("success", data);
        return { error };
    };

    return {
        ...toRefs(state),
        signInWithPassword,
        signOut,
        signUp,
    };
});
