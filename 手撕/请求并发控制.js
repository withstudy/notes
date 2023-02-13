class Manager{
    constructor(m) {
        this.max = m
        this.queue = []
        this.currentLen = 0
    }

    request(url,data){
        return new Promise((resolve,reject) => {
            this.queue.push({
                url,data,resolve,reject
            })
            this._request()
        })
    }

    _request(){
        if(this.currentLen >= this.max){
            return;
        }
        const item = this.queue.shift()
        if(item){
            this.currentLen ++
            fetch(item.url,item.data)
                .then()
                .then(item.resolve,item.reject)
                .finally(() => {
                    this.currentLen --
                    this._request()
                })
        }
    }
}
