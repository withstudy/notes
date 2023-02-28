<template>
    <div>hello vue</div>
    <HelloWorld />
    <br>
    <router-link to="/about">about</router-link>
    <br>
    <router-link to="/">index</router-link>
    <router-view />
</template>

<script setup>
import HelloWorld from './components/HelloWorld'
</script>

<style scoped>

</style>
