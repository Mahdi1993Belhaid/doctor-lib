import { createRouter, createWebHistory } from 'vue-router';
import MedicalDocumentForm from '../components/MedicalDocumentForm.vue';
import MedicalDocumentTable from '../components/MedicalDocumentTable.vue';

const routes = [
  {
    path: '/',
    redirect: '/display-cases', // Redirect root to Display Cases as default
  },
  {
    path: '/add-new-case/:id',
    name: 'EditCase',
    component: MedicalDocumentForm,
    props: true,
  },
  {
    path: '/add-new-case',
    name: 'AddNewCase',
    component: MedicalDocumentForm,
  },
  {
    path: '/display-cases',
    name: 'DisplayCases',
    component: MedicalDocumentTable,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;