import { createRouter, createWebHistory } from 'vue-router';
import{useUserAuth} from '../stores/userAuth';
import MedicalDocumentForm from '../components/MedicalDocumentForm.vue';
import MedicalDocumentTable from '../components/MedicalDocumentTable.vue';
import LoginView from '../components/LoginView.vue';
import Dashboard from '../components/dashboard/Dashboard.vue';
import UserForm from '../components/UserForm.vue';

const routes = [
  {
    path: '/',
    redirect: '/display-cases', 
  },
  {
    path: '/add-new-case/:id',
    name: 'EditCase',
    component: MedicalDocumentForm,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/add-new-case',
    name: 'AddNewCase',
    component: MedicalDocumentForm,
    meta: { requiresAuth: true }
  },
  {
    path: '/display-cases',
    name: 'DisplayCases',
    component: MedicalDocumentTable,
    meta: { requiresAuth: true }
  },

  {
    path: '/user',
    name: 'UserForm',
    component: UserForm,
    meta: { requiresAuth: true }
  },
   {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach((to, from, next) => {
  const auth = useUserAuth()
  
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router;