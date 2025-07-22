<template>
  <div class="d-flex justify-content-center align-items-center min-vh-100 bg-light">
    <div class="card p-4 shadow-sm" style="width: 360px; direction: rtl;">
      <h4 class="text-center mb-4">تسجيل الدخول</h4>

      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label class="form-label">البريد الإلكتروني</label>
          <div class="input-group">
            <input
              type="email"
              v-model="email"
              class="form-control"
              placeholder="dr.asma@autismms.com"
              required
            />
            <span class="input-group-text">
              <i class="bi bi-envelope"></i>
            </span>
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label">كلمة المرور</label>
          <div class="input-group">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              class="form-control"
              required
            />
            <span class="input-group-text" @click="togglePassword" style="cursor: pointer;">
              <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
            </span>
          </div>
        </div>

        <button type="submit" class="btn btn-primary w-100">دخول</button>
        <p v-if="error" class="text-danger text-center mt-2">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useUserAuth } from '../stores/userAuth';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'LoginForm',
  setup() {
    const email = ref('');
    const password = ref('');
    const showPassword = ref(false);
    const error = ref<string | null>(null);
    const store = useUserAuth();
    const router = useRouter();

    const togglePassword = () => {
      showPassword.value = !showPassword.value;
    };

    const handleLogin = async () => {
      try {
        
        await store.login(email.value, password.value);
        await router.push('/dashboard');
      } catch (err) {
        error.value = (err as Error).message || 'Login failed';
      }
    };

    return {
      email,
      password,
      showPassword,
      error,
      togglePassword,
      handleLogin
    };
  }
});
</script>

<style scoped>
body {
  background-color: #f8f9fa;
}
.card {
  border-radius: 12px;
}
</style>