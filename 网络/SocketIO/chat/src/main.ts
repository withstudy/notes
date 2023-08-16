import { createApp } from 'vue'

import App from './App.vue'

import { io, Socket } from "socket.io-client"

const socket:Socket  = io('ws://localhost:3000')
socket.on('connect', () => {
  console.log(socket.id)
})

const app = createApp(App)

app.config.globalProperties.io = socket

app.mount('#app')
