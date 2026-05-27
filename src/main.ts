import './style.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.directive('swipe', {})

app.use(createPinia())
app.use(router)
app.use(createPinia)

app.mount('#app')
