import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Index',
        component: () => import('@/views/Index/index.vue'),
        meta: {
            transition: 'animate__bounceInDown'
        }
    },
    {
        path: '/game',
        name: 'Game',
        component: () => import('@/views/Game/index.vue'),
        meta: {
            transition: 'animate__zoomIn'
        }
    },
    {
        path: '/setting',
        name: 'Setting',
        component: () => import('@/views/Setting/index.vue'),
        meta: {
            transition: 'animate__zoomIn'
        }
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router