<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore, storeToRefs } from "../store/pinia";

const router = useRouter()
const auth = useAuthStore();

const { isLoading } = storeToRefs(auth);

var credentials = reactive({
    email: "henry.havelka@seznam.cz",
    password: "mango123"
})

async function handleLogin() {
    await auth.signInWithPassword(credentials);
    router.push({ name: 'home' })
}

</script>

<template>
    <div class="auth">
        <form class="login" @submit.prevent="handleLogin">
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
                <!-- <input key="remember-me" type="checkbox" />
                <label for="remember-me">Remember me</label> -->
            </div>

            <div class="login-button-group">
                <input class="primary center button full-width" type="submit" :value="isLoading ? 'Loading' : 'Log In'"
                    :disabled="isLoading" />

                <del>
                    <div class="right font-secondary">Forgot password?</div>
                </del>
            </div>
        </form>

        <div class="separator">or</div>


        <button class="button white dark-20 full-width center" type="submit" :disabled="isLoading">
            <img class="icon" src="/google_icon.png" />
            <del>
                <div> Sign in with Google</div>
            </del>
        </button>

        <div class="center">
            <div>New around here?</div> &nbsp;
            <router-link :to="{ name: 'register' }" class="font-primary">Sign up!</router-link>
        </div>
    </div>

</template>

<style scoped>
.auth {
    display: grid;
    grid-gap: 1.1rem;
    width: 300px;
    margin: auto;
    padding-top: 15%;
}

.login {
    display: grid;
    grid-gap: 1.1rem;
}

.login-button-group {
    display: grid;
    grid-gap: 0.3rem;
}

.icon {
    max-width: 1.3rem;
}
</style>