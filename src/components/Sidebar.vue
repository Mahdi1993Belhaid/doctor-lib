<template>
    <div class="sidebar">
      <img src="/logo-with-text.jpg" alt="avatar" class="avatar" width="230" height="150" />
      <h3 class="sidebar-title">{{ $t('sidebar.menu.medicalRecords') }}</h3>
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link to="/dashboard" class="nav-link" active-class="active">
            {{ $t('sidebar.menu.home') }}
          </router-link>
        </li>
       
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="medicalRecordsDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            {{ $t('sidebar.menu.medicalRecords') }}
          </a>
          <ul class="dropdown-menu" aria-labelledby="medicalRecordsDropdown">
            <li>
              <router-link to="/add-new-case" class="dropdown-item" active-class="active">
                {{ $t('sidebar.menu.addFiles') }}
              </router-link>
            </li>
            <li>
              <router-link to="/display-cases" class="dropdown-item" active-class="active">
                {{ $t('sidebar.menu.displayFiles') }}
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { useI18n } from 'vue-i18n';
  
  export default defineComponent({
    name: 'Sidebar',
    setup() {
      const { t } = useI18n();
      return { t };
    },
  });
  </script>
  
  <style scoped>
  .sidebar {
    width: 250px;
    height: 100vh;
    background-color: #f8f9fa;
    padding: 20px;
    position: fixed;
    top: 0;
    right: 0; /* Changed from left to right */
  }
  
  .sidebar-title {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
  }
  
  .nav-item {
    margin-bottom: 10px;
  }
  
  .nav-link {
    color: #333;
    text-decoration: none;
    padding: 10px;
    display: block;
    border-radius: 5px;
  }
  
  .nav-link:hover,
  .nav-link.active {
    background-color: #007bff;
    color: white;
  }
  
  .dropdown-menu {
    width: 100%;
    border: none;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .dropdown-item {
    padding: 10px 20px;
    color: #333;
  }
  
  .dropdown-item:hover,
  .dropdown-item.active {
    background-color: #007bff;
    color: white;
  }
  </style>