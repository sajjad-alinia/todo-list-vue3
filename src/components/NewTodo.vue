<script setup>
import { ref } from 'vue'
import locaStoreService from '../services/localStoreService'
import router from '../router';
import {useRouter } from "vue-router"

const localStoreSRV = new locaStoreService()
const route = useRouter()

const title = ref('')
const description = ref('')
const priority = ref(1)
const dueDate = ref('')

let editMode = false
let editId = false


if(route.currentRoute.value.params.id)
{
  editId = route.currentRoute.value.params.id
  editMode=true
  const data = localStoreSRV.getTodoListByIndex(route.currentRoute.value.params.id)
  title.value = data.title
  description.value = data.description
  priority.value = data.priority
  dueDate.value = new Date(data.dueDate).toISOString().substring(0, 10)
}


const submitForm = () => {
  if (title.value.length && description.value.length) {
    if(editMode)
    {
      localStoreSRV.editTodo(editId, title.value, description.value, priority.value, dueDate.value)
      router.push({ name: 'todoListPage' })
    }else
    {
      localStoreSRV.addTodo(title.value, description.value, priority.value, dueDate.value)
      router.push({ name: 'homePage' })
    }
  }
  else {
    alert('لطفا فرم را تکمیل کنید')
  }
}

</script>
<template>
  <form class="row mt-3 bg-light rounded p-3" @submit.prevent="submitForm()" id="newTodo">
    <div class="col-6 col-md-4 mb-3">
      <label for="title" class="form-label">عنوان</label>
      <input v-model="title" type="text" class="form-control" id="title">
    </div>
    <div class="col-6 col-md-4 mb-3">
      <label for="priority" class="form-label">اولویت</label>
      <select v-model="priority" class="form-select" id="Priority">
        <option value="1">کم</option>
        <option value="2">متوسط</option>
        <option value="3">زیاد</option>
      </select>
    </div>
    <div class="col-6 col-md-4 mb-3">
      <label for="dueDate" class="form-label">تاریخ سر رسید</label>
      <input v-model="dueDate" type="date" class="form-control" id="dueDate">
    </div>
    <div class="col-12 col-md-12mb-3">
      <label for="description" class="form-label">توضیحات</label>
      <textarea v-model="description" class="form-control" id="description" rows="5"></textarea>
    </div>
    <div class="col-12 ">
      <div class="row mt-2  justify-content-between">
        <div class="col-3 col-md-1">
          <button type="submit" class="btn btn-primary px-3">
            <span v-if="editMode">
              ویرایش
            </span>
            <span v-else>
              ثبت
            </span>
          </button>

        </div>
        <div class="col-3 col-md-1 text-end">
          <RouterLink :to="{ name: 'homePage' }" class="btn px-3 text-end">بازگشت</RouterLink>
        </div>
      </div>
    </div>
  </form>
</template>