<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
  if ('Notification' in window) {
  const notificationStatus = Notification.permission
  if (notificationStatus != 'granted') {
    requestPermission()
  }
}

setInterval(() => {
  const localStoreSRV = new LocalStoreService()
  const todoList = localStoreSRV.getTodoList()
  todoList.map((item) => {
    const dDate = new Date(item.dueDate).getTime()
    const currentDate = new Date().getTime()
    const def = dDate - currentDate

    if (def < 86_400_000) {
      new Notification(item.title, { body: item.description })
    }
  })
}, 20000)

function requestPermission() {
  if (!('Notification' in window)) {
    alert('Notification API not supported!')
    return
  }

  Notification.requestPermission(function (result) {})
}
</script>

<template>
  <Navbar />
  <RouterView />
</template>
