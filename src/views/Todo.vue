<script setup>
import { ref } from 'vue'
import LocalStoreService from '../services/localStoreService';

const localStoreSRV = new LocalStoreService()
const todoList = ref()

// show / hide
const showTitle = ref(true)
const showDescription = ref(true)
const showCreateDate = ref(true)
const showPriority = ref(true)
const showAction = ref(true)
const showDueDate = ref(true)
const activeFilter = ref(false)


const getTodoList = () => {
  todoList.value = localStoreSRV.getTodoList()
}

const priorityFilter = (e) => {
  activeFilter.value = true
  getTodoList()
  todoList.value = todoList.value.filter((item) => item.priority === parseInt(e.target.value))
}

const dateFilter = (e) => {
  activeFilter.value = true
  const searchDate = new Date(e.target.value).getTime()
  getTodoList()
  todoList.value = todoList.value.filter((item) => {
    const orginal = new Date(item.dueDate).getTime()
    return orginal == searchDate
  })
}

const titleFilter = (e) =>{
  activeFilter.value = true
  getTodoList()
  todoList.value = todoList.value.filter((item) => item.title.includes(e.target.value) )
}

const descriptionFilter = (e)=>{
  activeFilter.value = true
  getTodoList()
  todoList.value = todoList.value.filter((item) => item.description.includes(e.target.value) )
}

const clearFilter = () => {
  activeFilter.value = false
  getTodoList()
}

const removeTodo = (index) => {
  if (confirm("حذف شود؟")) {
    localStoreSRV.removeTodo(index)
    getTodoList()
  }
}

getTodoList()
</script>

<template>
  <div class="row justify-content-center ">
    <div class="col-12 col-md-10 p-4 bg-light shadow-sm my-3 rounded">
      <p>تنظیمات</p>
      <hr>
      <p>نمایش ستون ها</p>
      <div class="row gx-3 justify-content-around">
        <div class="col-6 col-md-auto my-2 bg-white p-2 rounded-pill shadow-sm">
          <div class="form-check form-switch">
            <input v-model="showTitle" class="form-check-input" type="checkbox" role="switch" id="showTitle" checked>
            <label class="form-check-label" for="showTitle">عنوان</label>
          </div>
        </div>
        <div class="col-6 col-md-auto my-2 col-my-auto bg-white p-2 rounded-pill shadow-sm">
          <div class="form-check form-switch">
            <input v-model="showDescription" class="form-check-input" type="checkbox" role="switch" id="showDescription"
              checked>
            <label class="form-check-label" for="showDescription">توضیحات</label>
          </div>
        </div>
        <div class="col-6 col-md-auto  my-2 bg-white p-2 rounded-pill shadow-sm">
          <div class="form-check form-switch">
            <input v-model="showCreateDate" class="form-check-input" type="checkbox" role="switch" id="showCreateDate"
              checked>
            <label class="form-check-label" for="showCreateDate">تاریخ ثبت</label>
          </div>
        </div>
        <div class="col-6 col-md-auto  my-2 bg-white p-2 rounded-pill shadow-sm">
          <div class="form-check form-switch">
            <input v-model="showDueDate" class="form-check-input" type="checkbox" role="switch" id="showDueDate" checked>
            <label class="form-check-label" for="showDueDate">تاریخ سررسید</label>
          </div>
        </div>
        <div class="col-6 col-md-auto my-2 bg-white p-2 rounded-pill shadow-sm">
          <div class="form-check form-switch">
            <input v-model="showPriority" class="form-check-input" type="checkbox" role="switch" id="showPriority"
              checked>
            <label class="form-check-label" for="showPriority">اولیت</label>
          </div>
        </div>
        <div class="col-6 col-md-auto my-2 bg-white p-2 rounded-pill shadow-sm">
          <div class="form-check form-switch">
            <input v-model="showAction" class="form-check-input" type="checkbox" role="switch" id="showAction" checked>
            <label class="form-check-label" for="showAction">عملیات</label>
          </div>
        </div>

      </div>

      <p>فیلتر</p>
      <div class="row justify-content-start">
        <div class="col-6 col-md-2  my-2 ">
          <label for="titleFilter" class="form-label">عنوان</label>
          <input @input="titleFilter($event)" type="text" class="form-control" id="titleFilter">
        </div>
        <div class="col-6 col-md-2  my-2 ">
          <label for="descriptionFilter" class="form-label">توضیحات</label>
          <input @input="descriptionFilter($event)" type="text" class="form-control" id="descriptionFilter">
        </div>
        <div class="col-6 col-md-2  my-2 ">
          <label for="dateTimeSelection" class="form-label">تاریخ سررسید</label>
          <input @change="dateFilter($event)" type="date" class="form-control" id="dateTimeSelection">
        </div>
        <div class="col-6 col-md-2 my-2">
          <label for="prioritySelection" class="form-label">اولویت</label>
          <select @change="priorityFilter($event)" class="form-select" id="prioritySelection">
            <option value="1">کم</option>
            <option value="2">متوسط</option>
            <option value="3">زیاد</option>
          </select>
        </div>
        <div class="col-12 col-md-2 my-2">
          <button class="btn btn-info mt-4" v-show="activeFilter" @click="clearFilter">حذف فیلتر</button>
        </div>
      </div>

    </div>
  </div>
  <div class="row justify-content-center">
    <div class="col-12 col-md-10 table-responsive">
      <table class="table table-striped table-responsive">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col" v-show="showTitle">عنوان</th>
            <th scope="col" v-show="showDescription">توضیحات</th>
            <th scope="col" v-show="showCreateDate">تاریخ ثبت</th>
            <th scope="col" v-show="showDueDate">تاریخ سررسید</th>
            <th scope="col" v-show="showPriority">اولویت</th>
            <th scope="col" v-show="showAction">عملیات</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in todoList" :key="index">
            <th scope="row">{{ index + 1 }}</th>
            <td v-show="showTitle">{{ item.title }}</td>
            <td v-show="showDescription">{{ item.description }}</td>
            <td v-show="showCreateDate">{{ item.createDate }}</td>
            <td v-show="showDueDate">{{ item.dueDate }}</td>
            <td v-show="showPriority">{{ $filters.priorityParse(parseInt(item.priority)) }}</td>
            <td v-show="showAction">
              <RouterLink :to="{ name: 'edit', params: { 'id': index } }" class="btn text-info">
                <svg width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                  stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4"></path>
                  <path d="M13.5 6.5l4 4"></path>
                </svg>
              </RouterLink>
              <button class="btn text-danger" @click="removeTodo(item.index)">
                <svg width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                  stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M20 6a1 1 0 0 1 .117 1.993l-.117 .007h-.081l-.919 11a3 3 0 0 1 -2.824 2.995l-.176 .005h-8c-1.598 0 -2.904 -1.249 -2.992 -2.75l-.005 -.167l-.923 -11.083h-.08a1 1 0 0 1 -.117 -1.993l.117 -.007h16zm-9.489 5.14a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z"
                    stroke-width="0" fill="currentColor"></path>
                  <path
                    d="M14 2a2 2 0 0 1 2 2a1 1 0 0 1 -1.993 .117l-.007 -.117h-4l-.007 .117a1 1 0 0 1 -1.993 -.117a2 2 0 0 1 1.85 -1.995l.15 -.005h4z"
                    stroke-width="0" fill="currentColor"></path>
                </svg> </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
