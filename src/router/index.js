// import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: [
//     {
//       path: '/',
//       name: 'home',
//       component: HomeView,
//     },
//     {
//       path: '/about',
//       name: 'about',
//       // route level code-splitting
//       // this generates a separate chunk (About.[hash].js) for this route
//       // which is lazy-loaded when the route is visited.
//       component: () => import('../views/AboutView.vue'),
//     },
//   ],
// })

// export default router

import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import Login from '@/views/Login.vue'
import Dashboard from '@/views/Dashboard.vue'
import NotFound from '@/pages/NotFound.vue'
import MainLayout from '@/layout/MainLayout.vue'
import MasterUnit from '@/views/MasterUnit.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    // meta: { requiresAuth: true },
    component: Login,
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    meta: { requiresAuth: true },
    component: NotFound,
  },
  {
    path: '/',
    redirect: '/dashboard',
    meta: { requiresAuth: true },
    component: MainLayout,
    children: [
      // {
      //   path: '',
      //   redirect: '/dashboard',
      // },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard,
      },
      {
        path: 'master/unit',
        name: 'MasterUnit',
        component: MasterUnit,
      },
      // {
      //   path: '/master/unit',
      //   name: 'MasterUnit',
      //   component: MasterUnit,
      // },
    ],
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('user') // or check your auth state

  if (to.meta.requiresAuth && !isAuthenticated) {
    // Route requires authentication but user is not authenticated
    next('/login')
  } else if (to.meta.requiresGuest && isAuthenticated) {
    // Route is for guests only but user is authenticated
    next('/dashboard')
  } else {
    // Allow navigation
    next()
  }
})

export default router
