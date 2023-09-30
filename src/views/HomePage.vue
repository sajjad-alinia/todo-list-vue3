<script setup>
import { ref } from 'vue'
import LocalStoreService from '../services/localStoreService';

const localStoreSRV = new LocalStoreService()
const todoList = ref()

const getTodoList = () => {
  todoList.value = localStoreSRV.getTodoList()
}

getTodoList()

</script>
<template>
  <div class="row gx-3 justify-content-center align-items-center ">
    <div class="col-12">
      <RouterLink :to="{ name: 'new' }" type="button" class="btn btn-success px-3 mx-2">
        جدید
      </RouterLink>
    </div>
    <div class="col-6 col-md-2" v-for="(item, index) in todoList" :key="index">
      <div class="row bg-primary rounded p-2 shadow-sm m-2">
        <div class="col-12 text-white">
          <p class="fs_14 fw-bolder">{{ item.title }}</p>
          <p class="fs_12 text-truncate">{{ item.description }}</p>
          <p class="fs_12"> {{ item.createDate }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

