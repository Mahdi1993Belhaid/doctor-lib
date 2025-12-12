<template>
  <header v-if="isAuthenticated" class="bg-white shadow-sm p-3 d-flex justify-content-between align-items-center">
    <div class="d-flex align-items-center gap-3">
      <img :src="userAvatar" alt="User Avatar" class="rounded-circle" width="40" height="40" />
      <div>
        <p class="mb-0 fw-semibold">{{userName}}</p>
        <p class="mb-0 fw-semibold">{{ userSpeciality}}</p>
        
      </div>
      <button class="btn btn-outline-secondary btn-sm rounded-circle p-0" style="width: 24px; height: 24px;">
        <span class="d-block bg-success rounded-circle" style="width: 16px; height: 16px;"></span>
      </button>
    </div>
    <div class="d-flex align-items-center gap-2">
      
      <h1 class="h5 mb-0 fw-bold">{{ $t('header.medicalRecord') }}</h1>
      <select class="form-select form-select-sm" v-model="$i18n.locale" style="width: auto;">
        <option value="ar">{{ $t('header.chooseLanguage') }}: العربية</option>
        <option value="en">{{ $t('header.chooseLanguage') }}: English</option>
      </select>
      
      <button @click="logout" class="btn btn-outline-danger btn-sm">Logout</button>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'; // Import computed
import { useI18n } from 'vue-i18n';
import { useUserAuth } from '../stores/userAuth';

export default defineComponent({
  name: 'Header',
  setup() {
    const { t } = useI18n();
    const store = useUserAuth();

    const userName = computed(() => store.user?.firstName +' ' +store.user.lastName);
    const userAvatar = computed(() => store.user.avatar);
    const userSpeciality = computed(() => store.user?.specialty || 'https://via.placeholder.com/40');
    const isAuthenticated = computed(() => store.isAuthenticated);

    const logout = () => {
      store.logout();
      
      this.$router.push('/login');
    };

    return { t, userName, userAvatar, isAuthenticated, logout };
  }
});
</script>