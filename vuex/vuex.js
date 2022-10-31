let _Vue = null

class Store {
    constructor(options) {
        const {
            state = {},
            getters = {},
            mutations = {},
            actions = {}
        } = options
        this.state = _Vue.observeble(state)
        this.getters = Object.create(null)
        Object.keys(getters).forEach(key => {
            Object.defineProperty(this.getters,key,{
                get: () => this.getters[key](this.state)
            })
        })

        this.mutations = mutations
        this.actions = actions
    }

    commit(type,payload){
        this.mutations[type](this.state,payload)
    }

    dispatch(type,payload){
        this.actions[type](this.state,payload)
    }
}

function install(Vue){
    _Vue = Vue
    _Vue.mixin({
        beforeCreate() {
            if(this.$options.store){
                _Vue.prototype.$store = this.$options.store
            }
        }
    })
}

export default {
    Store,
    install
}
