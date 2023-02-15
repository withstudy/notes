<template>
    <h1 id="hello">hello world</h1>
    <img src="../assets/images/zhuchiren.png"/>
    <span>{{ num }}</span>
    <button @click="handleAdd">add</button>
</template>

<script setup>
import {ref} from "vue";

const num = ref(0)

function handleAdd() {
    Promise.resolve().then(() => {
        setTimeout(() => {
            num.value++

            console.log('????')
        }, 2000)
    })
}

const n = 0
</script>

<style scoped lang="less">
@h1: red;
#hello {
    color: @h1;
}
</style>
