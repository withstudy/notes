class Dep{
    constructor() {
        this.subs = []
    }

    addSub(watcher){
        if(!watcher || !watcher.update) return
        this.subs.push(watcher)
    }

    notify(){
        this.subs.forEach(watcher => {
            watcher.update()
        })
    }
}
