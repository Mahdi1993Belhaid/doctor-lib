<template>
    <header class="bg-white shadow-sm p-3 d-flex justify-content-between align-items-center">
      <div class="d-flex align-items-center gap-3">
        <img src="https://via.placeholder.com/40" alt="User Avatar" class="rounded-circle" width="40" height="40" />
        <div>
          <p class="mb-0 fw-semibold">{{ $t('header.userName') }}</p>
          <p class="mb-0 text-muted small">{{ $t('header.online') }}</p>
        </div>
        <button class="btn btn-outline-secondary btn-sm rounded-circle p-0" style="width: 24px; height: 24px;">
          <span class="d-block bg-success rounded-circle" style="width: 16px; height: 16px;"></span>
        </button>
      </div>
      <div class="d-flex align-items-center gap-2">
        <button class="btn btn-outline-secondary btn-sm">
          <i class="bi bi-arrows-angle-expand"></i>
        </button>
        <h1 class="h5 mb-0 fw-bold">{{ $t('header.medicalRecord') }}</h1>
        <select class="form-select form-select-sm" v-model="$i18n.locale" style="width: auto;">
          <option value="ar">{{ $t('header.chooseLanguage') }}: العربية</option>
          <option value="en">{{ $t('header.chooseLanguage') }}: English</option>
        </select>
        <div class="bg-light rounded-circle d-flex align-items-center justify-content-center" style="width: 32px; height: 32px;">
          <i class="bi bi-heart-fill text-danger"></i>
        </div>
      </div>
    </header>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { useI18n } from 'vue-i18n';
  
  export default defineComponent({
    name: 'Header',
    setup() {
      const { t } = useI18n();
      return { t };
    },
  });
  </script>