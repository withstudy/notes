// 在一个不重复的正整数数组中找到和为target的组合
function fn(nums,target){
    const res = []
    const path = []
    // nums.sort()
    let sum = 0
    function r(i=0){
        if(sum > target)return
        if(sum === target){
            res.push([...path])
            return
        }

        for(; i<nums.length; i++){
            const n = nums[i]
            path.push(n)
            sum += n
            r(i,sum)
            path.pop()
            sum -= n
        }
    }
    r()
    return res
}

console.log(fn([2,5,3,1],4))

