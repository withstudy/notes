function fn(nums){
    const len = nums.length
    if(len === 1) return nums
    const mid = Math.floor(len / 2)
    let left = nums.slice(0,mid), right = nums.slice(mid)
    left = fn(left)
    right = fn(right)
    let res = []
    while (left.length && right.length){
        if(left[0] < right[0]){
            res.push(left.shift())
        } else {
            res.push(right.shift())
        }
    }
    res.push(...[...left,...right])
    return res
}

console.log(fn([3,2,1,0,5]))
