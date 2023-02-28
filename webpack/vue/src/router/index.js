import { createRouter, createWebHashHistory } from 'vue-router'
const views = require.context('@/views', true, /.vue$/).keys()
const routes = views.map( item => {
    const path = item.slice(1,-10) || '/'
    const name = path.slice(1).split('/').join('-') || 'index'
    return {
        path,
        name,
        component: () => import(`@/views${item.slice(1)}`)
    }
})

export default createRouter({
    history: createWebHashHistory('/'),
    routes: routes
})
