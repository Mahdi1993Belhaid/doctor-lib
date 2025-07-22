<template>
  <div class="d-flex flex-column" style="min-height: 100vh;">
    <!-- Show Login Page if not authenticated -->
    <div v-if="!isAuthenticated">
      <router-view />
    </div>
    <!-- Show Main Layout if authenticated -->
    <div v-else class="d-flex flex-column" style="min-height: 100vh;">
      <!-- Custom Header -->
      <Header />

      <!-- Main Content with Sidebar on the Right -->
      <div class="d-flex flex-grow-1">
        <main class="content flex-grow-1" style="margin-right: 250px; padding: 20px; width: calc(100% - 250px);">
          <router-view />
        </main>
        <Sidebar class="flex-shrink-0" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import Header from './components/Header.vue';
import Sidebar from './components/Sidebar.vue';
import { useUserAuth } from './stores/userAuth'; // Adjust the path as needed

export default defineComponent({
  name: 'App',
  components: {
    Header,
    Sidebar,
  },
  setup() {
    const store = useUserAuth();
    const isAuthenticated = computed(() => store.isAuthenticated);

    return { isAuthenticated };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.content {
  overflow-y: auto;
}
</style>