
<script setup>
import { reactive } from 'vue';
import { supabase } from '../scripts/supabase';
import { useDataStore } from '../store/pinia';
import Daypicker from './Daypicker.vue'

const props = defineProps(['challenge'])
const parent = props.challenge;
const isDisabled = parent ? true : false;
const units = useDataStore().units;
const today = new Date().toISOString().slice(0, 10);
console.log(today, parent.end)

var challenge = reactive({
    name: parent.name || '',
    description: parent.description || '',
    start: today,
    end: parent.end,
    periodicity: [0, 0, 0, 0, 0, 0, 0],
    unit_name: parent.unit_name,
    unit_id: parent.unit_id,
    unit_value: 0,
})

async function insert() {
    const payload = {
        start: challenge.start,
        periodicity: challenge.periodicity,
        value: challenge.unit_value
    }
    const { error } = await supabase.from('challenge_instance').insert(payload);
    console.log(error)
    console.log(challenge.periodicity)
}
</script>

<template>
    <form action="post">
        name
        <input type="text" name="" id="" :value="challenge.name" :disabled="isDisabled" />
        description
        <input type="text" name="" id="" :value="challenge.description" :disabled="isDisabled" />
        <div>
            how many?
            <input type="number" name="" id="" :value="challenge.unit_value" />
            <select v-model="challenge.unit_id" :disabled="isDisabled">
                <option v-for="unit in units" :value="unit.id"> {{ unit.name }} </option>
            </select>
        </div>
        <Daypicker v-model:selected="challenge.periodicity" />
        <div>
            start
            <input type="date" name="" id="" :value="challenge.start" :disabled="isDisabled" />
            end
            <input type="date" name="" id="" :value="challenge.end" :disabled="isDisabled" />
        </div>

        <button @click.prevent="insert">insert</button>
    </form>
</template>

<style scoped>
form {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 1rem;
}
</style>
