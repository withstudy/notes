import { createSSRApp } from 'vue'

export function createApp(){
    return createSSRApp({
        template: `<button @click='number++'>{{number}}</button>`,
        data(){return {number:1}}
    })
}