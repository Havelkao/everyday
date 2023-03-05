import { defineStore } from "pinia";
import { reactive, toRefs } from "vue";
import { supabase } from "../scripts/supabase";

export const _useDataStore = defineStore("data", () => {
    const state = reactive({
        challenges: [],
        units: [],
        session: {},
    });

    const getChallenges = async () => {
        const { data, error, status } = await supabase.from("vw_user").select("*");
        state.challenges = data;
    };

    const getUnits = async () => {
        const { data, error, status } = await supabase.from("unit").select("*");
        state.units = data;
    };

    const getDataContext = async () => {
        await getChallenges();
        await getUnits();
    };

    return {
        ...toRefs(state),
        state,
        getDataContext,
        getChallenges,
    };
});
