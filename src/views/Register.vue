<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore, storeToRefs } from "../store/pinia";


const router = useRouter();
const auth = useAuthStore();
let { isLoading, errorMessage } = storeToRefs(auth)

var credentials = reactive({
    email: "",
    password: ""
})

function handleSubmit() {
    console.log(auth)
    if (!credentials.email || !credentials.password) {
        errorMessage.value = 'Mayhaps you should consider entering credentials first.';
        return;
    }
    const { error } = auth.signUp(credentials);
    if (!error) {
        router.push('/');
    }
}
</script>

<template>
    <form class="auth" @submit.prevent="handleSubmit">
        <h1>Everyday</h1>

        <div class="row input">
            <label for="email">Email</label>
            <input key="email" type="email" v-model="credentials.email" />
        </div>

        <div class="row input">
            <label for="password">Password</label>
            <input key='password' type="password" autocomplete="off" v-model="credentials.password" />
        </div>

        <div>
            <!-- empty -->
        </div>

        <input class="button full-width center" type="submit" :value="isLoading.value ? 'Loading' : 'Sign Up'"
            :disabled="isLoading.value" />

        <div class="center">
            <div>
                Already have an account? &nbsp;
            </div>
            <router-link :to="{ name: 'login' }" class="font-primary">Log in!</router-link>
        </div>

        <div class="center">
            {{ errorMessage }}
        </div>
    </form>
</template>

<style scoped>
.auth {
    display: grid;
    grid-gap: 1.1rem;
    width: 300px;
    margin: auto;
    padding-top: 15%;
}
</style>