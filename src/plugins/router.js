import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/', name: 'Home', component: () => import('@/views/Home.vue')
    },
    {
        path: '/history', name: 'History',  component: () => import('@/views/History.vue')
    },
    {
        path: '/code', name: 'Code',  component: () => import('@/views/Code.vue')
    },
]

const router = createRouter({
    routes, history: createWebHistory()
})

export default router