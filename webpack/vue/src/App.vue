<template>
    <div class="text-red-500">hello vue</div>
    <HelloWorld />
    <div class="flex flex-col">
        <div class="flex flex-row w-1/12 justify-around">
            <router-link to="/about" class="block">about</router-link>
            <router-link to="/" class="block">index</router-link>
        </div>
        <router-view class="border-2 w-1/12" />
    </div>
</template>

<script setup>
import HelloWorld from './components/HelloWorld'
</script>

<style scoped></style>
