function fn(nums){
    if(!nums.length || nums.length === 1) return nums
    const first = nums[0]
    const left = [], right = []
    for(let i = 1; i < nums.length; i ++){
        if(nums[i] < first){
            left.push(nums[i])
        }else{
            right.push(nums[i])
        }
    }
    return [...fn(left),first,...fn(right)]
}

console.log(fn([3,2,1,5,7,0]))
console.log(fn([1]))
console.log(fn([1,0]))
console.log(fn([]))
