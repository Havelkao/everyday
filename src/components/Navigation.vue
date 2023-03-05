<template>
    <nav class="nav">
        <div class="brand left">Everyday</div>
        <div class="right">
            <router-link to="/home"> home </router-link>
            <router-link to="/stats"> stats </router-link>
            <router-link to="/challenges"> challenges </router-link>
            <a @click="logout">log out</a>
        </div>

    </nav>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { userService } from '../scripts/supabase';

const router = useRouter();

function logout() {
    userService.logout();
    router.push('/')
}
</script>

<style scoped>
a {
    margin-right: 1rem;
    color: var(--font-color-primary);
    text-decoration: none;
    text-underline-offset: 0.5rem;
}

a:hover {
    text-decoration: underline;
}

.router-link-active {
    text-decoration: underline;
    color: var(--color-tertiary);
}

.brand {
    font-size: 2rem;
}
</style>
