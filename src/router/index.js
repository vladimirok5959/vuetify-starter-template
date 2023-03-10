// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    meta: {
      title: 'Dashboard | Home',
    },
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
    ],
  },
  {
    path: '/about',
    meta: {
      title: 'Dashboard | About',
    },
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
      },
    ],
  },
  {
    path: '/login',
    meta: {
      title: 'Dashboard | Login',
    },
    component: () => import('@/layouts/default/Blank.vue'),
    children: [
      {
        path: '',
        name: 'Login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    meta: {
      title: 'Dashboard | Not found',
    },
    component: () => import('@/layouts/default/Blank.vue'),
    children: [
      {
        path: '',
        name: 'Not found',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "notfound" */ '@/views/NotFound.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
