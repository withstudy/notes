<script setup lang="ts">
import { getCurrentInstance, type ComponentInternalInstance, ref, reactive } from 'vue'
const { appContext: { config: { globalProperties }} } = getCurrentInstance() as ComponentInternalInstance
const io= globalProperties?.io
console.log(io);

function handleCreateMeeting(){
  io.emit('create-meeting',meetingId.value)
}
const meetings = ref([])
const meetingId = ref('')
io.on('created-meeting',(res: any) => {
  console.log(res)
  meetings.value = res
})

io.on('joined-meeting',() => {
  console.log('加入成功')
})

const chats: string[] = reactive([])
io.on('new-chat',(chat: string) => {
  console.log(chat)
  chats.push(chat)
})

function handleSelectMeeting(e: Event){
  meetingId.value = e.target?.value
}

function handleJoinMeeting(){
  io.emit('join-meeting', meetingId.value)
}

const msg = ref('')
function hanldeSendChat(){
  io.emit('send-chat',meetingId.value, msg.value)
}
</script>

<template>
  <input v-model="meetingId" />
  <button @click="handleCreateMeeting">创建会议</button>
  <br>
  <select @change="handleSelectMeeting">
    <option v-for="m in meetings" :value="m" :key="m">{{ m }}</option>
  </select>
  <button @click="handleJoinMeeting">加入会议</button>
  <br>
  <div>
    <template v-for="c in chats" :key="c">
      <span>{{ c }}</span> <br>
    </template>
  </div>
  <br>
  <input v-model="msg" /><button @click="hanldeSendChat">发送</button>
</template>
