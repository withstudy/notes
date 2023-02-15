function flat(arr){
    if(!Array.isArray(arr))return arr
    return arr.reduce((pre,item) => {
        return pre.concat(flat(item))
    },[])
}

function flat2(data){
    const res = [], arr = [...data]
    while (arr.length){
        const item = arr.shift()
        if(Array.isArray(item)){
            arr.push(...item)
        } else {
            res.push(item)
        }
    }
    return res
}

function flat3(arr){
    return arr.flat(Infinity)
}

const arr = [1,{},[2,3],[{},[4,5,[6]]]]

console.log(flat(arr))
console.log(flat2(arr))
console.log(flat3(arr))
