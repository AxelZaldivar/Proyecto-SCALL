import { createRouter, createWebHashHistory, RouterLink } from 'vue-router'

//importar las rutas de las vistas
import HomeView from '../views/HomeView.vue'
import Login from '../views/Auth/Login.vue'
import Register from '../views/Auth/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import Update from '../views/Auth/Update.vue'
import SCALL from '../views/SCALL/SCALL.vue'
import Excedente from '../views/Excedente.vue'
import Predicciones from '@/views/Predicciones.vue'

//importar Firebase para recuperar el usuario y darle acceso al Dashboard
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      requireAuth: true
    }
  },
  {
  path: '/update',
  name: 'update',
  component: Update,
  meta: {
    requireAuth: true
  }
},
{
  path: '/SCALL',
  name: 'SCALL',
  component: SCALL,
  meta: {
    requireAuth: true
  }
},
{
  path: '/Excedente',
  name: 'Excedente',
  component: Excedente,
  meta: {
    requireAuth: true
  }
},
{
  path: '/Predicciones',
  name: 'Predicciones',
  component: Predicciones,
  meta: {
    requireAuth: true
  }
},
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

//solo permitir el acceso si se ha iniciado sesión
router.beforeEach((to, from, next) => {
  if(to.matched.some(ruta=>ruta.meta.requireAuth)){
    const user = firebase.auth().currentUser;
    if(user){
      next();
    }else{
      next({
        name: 'login'
      })
    }
  }else{
    next();
  }
})

export default router;