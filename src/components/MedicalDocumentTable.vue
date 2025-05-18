<template>
    <div class="p-4">
      <h2 class="h4 fw-bold mb-4">{{ $t('table.medicalDocuments') }}</h2>
  
      <!-- Button to Add New Document -->
      <div class="mb-4">
        <router-link to="/add-new-case" class="btn btn-primary">
          {{ $t('table.addNew') }}
        </router-link>
      </div>
  
      <!-- Loading Spinner -->
      <div v-if="isLoading" class="text-center">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">{{ $t('table.loading') }}</span>
        </div>
      </div>
  
      <!-- Table -->
      <div v-else>
        <table class="table table-bordered table-hover">
          <thead>
            <tr>
              <th>{{ $t('table.id') }}</th>
              <th>{{ $t('form.firstName') }}</th>
              <th>{{ $t('form.lastName') }}</th>
              <th>{{ $t('form.documentNumber') }}</th>
              <th>{{ $t('form.examinationDate') }}</th>
              <th>{{ $t('table.actions') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="document in medicalDocuments" :key="document.id">
              <td>{{ document.id }}</td>
              <td>{{ document.firstName }}</td>
              <td>{{ document.lastName }}</td>
              <td>{{ document.documentNumber }}</td>
              <td>{{ formatDate(document.examinationDate) }}</td>
              <td>
                <router-link
                  v-if="isValidId(document.id)"
                  :to="{ name: 'EditCase', params: { id: document.id || '' } }"
                  class="btn btn-sm btn-primary me-2"
                >
                  {{ $t('table.edit') }}
                </router-link>
                <button
                  v-if="isValidId(document.id)"
                  class="btn btn-sm btn-danger"
                  @click="confirmDelete(document.id)"
                >
                  {{ $t('table.delete') }}
                </button>
                <span v-else class="text-danger">Invalid ID</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useRouter } from 'vue-router';
  import { MedicalDocument } from '../models/MedicalDocument';
  import { MedicalDocumentServiceImpl } from '../services/MedicalDocumentServiceImpl';
  
  export default defineComponent({
    name: 'MedicalDocumentsTable',
    setup() {
      const { t } = useI18n();
      const router = useRouter();
      const medicalDocuments = ref<MedicalDocument[]>([]);
      const medicalDocumentService = new MedicalDocumentServiceImpl();
      const isLoading = ref(false);
  
      const formatDate = (date: Date | null): string => {
        if (!date) return '-';
        return new Date(date).toISOString().split('T')[0];
      };
  
      const isValidId = (id: string | undefined): boolean => {
        return id !== undefined && id !== '';
      };
  
      const fetchDocuments = async () => {
        isLoading.value = true;
        try {
          const documents = await medicalDocumentService.getAll();
          console.log('Fetched documents:', documents);
          medicalDocuments.value = documents.map(doc => ({
            ...doc,
            id: doc.id || undefined,
          }));
          console.log('Processed medicalDocuments:', medicalDocuments.value);
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          alert(`Failed to fetch medical documents: ${errorMessage}`);
          console.error('Fetch error details:', error);
        } finally {
          isLoading.value = false;
        }
      };
  
      const confirmDelete = async (id: string | undefined) => {
        if (!isValidId(id)) {
          alert('Invalid document ID');
          return;
        }
        if (confirm(t('table.confirmDelete'))) {
          try {
            await medicalDocumentService.delete(id);
            medicalDocuments.value = medicalDocuments.value.filter(doc => doc.id !== id);
            alert(t('table.deleteSuccess'));
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            alert(`Failed to delete medical document: ${errorMessage}`);
            console.error('Delete error details:', error);
          }
        }
      };
  
      onMounted(fetchDocuments);
  
      return {
        medicalDocuments,
        isLoading,
        formatDate,
        confirmDelete,
        isValidId,
        t,
      };
    },
  });
  </script>
  
  <style scoped>
  .table {
    width: 100%;
    margin-bottom: 1rem;
    color: #212529;
  }
  
  .table th,
  .table td {
    padding: 0.75rem;
    vertical-align: top;
    border-top: 1px solid #dee2e6;
  }
  
  .table thead th {
    vertical-align: bottom;
    border-bottom: 2px solid #dee2e6;
  }
  
  .table tbody + tbody {
    border-top: 2px solid #dee2e6;
  }
  
  .table-hover tbody tr:hover {
    background-color: rgba(0, 0, 0, 0.075);
  }
  
  .btn-sm {
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
    line-height: 1.5;
    border-radius: 0.2rem;
  }
  
  .spinner-border {
    width: 2rem;
    height: 2rem;
  }
  </style>