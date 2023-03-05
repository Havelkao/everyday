<template>
  <router-view v-slot="{ Component, route }">
    <Navigation v-if="!isAuth(route)" />
    <main :class="route.name">
      <component :is="Component" />
    </main>
  </router-view>
</template>

<script setup>
import Navigation from "./components/Navigation.vue";
import { onMounted } from "vue";
import { supabase } from "./scripts/supabase";
import { useAuthStore, useDataStore } from "./store/pinia";

const isAuth = (route) => {
  return route.name === 'login' || route.name == 'register' || route.name == '404';
}


const data = useDataStore();
const auth = useAuthStore();


onMounted(async () => {
  supabase.auth.getSession().then(({ data }) => {
    // console.log('get session', data)
  })

  supabase.auth.onAuthStateChange((event, session) => {
    // console.log(event)
  })

  await data.getDataContext();
})
</script>


<!-- <script setup>
  import { onMounted, ref } from 'vue'
  import Account from './components/Account.vue'
  import Auth from './components/Auth.vue'
  import { supabase } from './supabase'

  const session = ref()

  onMounted(() => {
    supabase.auth.getSession().then(({ data }) => {
      session.value = data.session
    })

    supabase.auth.onAuthStateChange((_, _session) => {
      session.value = _session
    })
  })
</script>

<template>
  <div class="container" style="padding: 50px 0 100px 0">
    <Account v-if="session" :session="session" />
    <Auth v-else />
  </div>
</template> -->
