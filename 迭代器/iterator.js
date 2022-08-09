const obj = {
    a:1,
    b:2,
    c:3
}

obj[Symbol.iterator] = function (){
    const keys = Object.entries(this)
    let index = 0
    return {
        next:function (){
            const key = keys[index++]
            const value = key ? [key[0],key[1]] : undefined
            return {
                value:value,
                done:index > keys.length
            }
        }
    }
}

for(let [key,value] of obj){
    console.log(key,value)
}
