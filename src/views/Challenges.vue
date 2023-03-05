<script setup>
import { storeToRefs, useDataStore } from '../store/pinia'
import NewChallenge from '../components/NewChallenge.vue'
import Modal from '../components/Modal.vue';
import { ref, reactive } from 'vue';

const data = useDataStore();
const { challenges } = storeToRefs(data)

let newChallenge = reactive({
    isVisible: false,
})

function joinChallenge(selectedChallenge) {
    // should set to true?
    newChallenge.isVisible = !newChallenge.isVisible
    Object.assign(newChallenge, selectedChallenge)
}


</script>

<template>
    <div class="challenge-card" v-for="challenge in challenges">
        <div>
            <div>{{ challenge.name }}</div>
            <div> {{ challenge.description }} </div>
        </div>
        <button @click="joinChallenge(challenge)">
            join
        </button>

    </div>
    <Modal v-model:data="newChallenge">
        <NewChallenge :challenge="newChallenge" />
    </Modal>
</template>

<style>
.challenges {
    display: flex;
    position: relative;
    flex-direction: column;
    gap: 1.1rem;
    padding-top: 2rem;
}
</style>

<style scoped>
.challenge-card {
    display: flex;
    justify-content: space-between;
}
</style>