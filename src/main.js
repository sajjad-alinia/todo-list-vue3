import './assets/main.css'
import * as bootstrap from 'bootstrap'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.config.globalProperties.$filters = {
    priorityParse(value) {
        if (value === 1) {
            return 'کم'
        } else if (value === 2) {
            return 'متوسط'
        } else if (value === 3) {
            return 'زیاد'
        }
    }
}

app.mount('#app')
