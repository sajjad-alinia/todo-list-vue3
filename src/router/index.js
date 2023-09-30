import { createRouter, createWebHistory } from 'vue-router'
import todoList from '../views/HomePage.vue'
import todo from '../views/Todo.vue'
import NewTodo from '../components/NewTodo.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'homePage',
      component: todoList
    },
    {
      path: '/todoListPage',
      name: 'todoListPage',
      component: todo,
    },
    {
      path: '/new',
      name: 'new',
      component: NewTodo,
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: NewTodo,
    }

  ]
})

export default router
