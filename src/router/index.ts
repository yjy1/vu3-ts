import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    redirect:'/goods',
    children:[
      {
        path: '/goods',
        name: 'goods',
        meta:{
          isShow:true,
          title:'商品列表'
        },
        component: () => import('../views/GoodsView.vue')
      },
      {
        path: '/user',
        name: 'user',
        meta:{
          isShow:true,
          title:'用户列表'
        },
        component: () => import('../views/UserView.vue')
      },
      {
        path:'/roles',
        name:'roles',
        component:()=> import('@/views/RoleView.vue'),
        meta:{
          isShow:true,
          title:'角色列表'
        }
      },
      {
        path:'/rights',
        name:'rights',
        component:()=>import('@/views/RightsView.vue'),
        meta: {
          isShow:true,
          title:'权限列表'
        }
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next)=>{
  const token = localStorage.getItem('token')
  if(to.path !=='/login'&& !token) router.push('/login')
  next()
})
export default router
