<template>
  <div class="container-fluid min-vh-100 d-flex flex-column">
    <!-- Show Login Page if not authenticated -->
    <div v-if="!isAuthenticated">
      <router-view />
    </div>

    <!-- Show Main Layout if authenticated -->
    <div v-else class="d-flex flex-column flex-grow-1">
      <!-- Header -->
      <Header />

      <!-- Main content area -->
      <div class="row flex-grow-1 m-0">
        <!-- Main Content -->
        <div class="col-12 col-md-9 p-3 order-2 order-md-1">
          <router-view />
        </div>

        <!-- Sidebar -->
        <div class="col-12 col-md-3 bg-light p-3 order-1 order-md-2">
          <Sidebar />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import Header from './components/Header.vue';
import Sidebar from './components/Sidebar.vue';
import { useUserAuth } from './stores/userAuth';

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
  color: #2c3e50;
}

.content {
  overflow-y: auto;
}
</style>
