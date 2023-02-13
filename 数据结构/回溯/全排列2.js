function fn(nums){
    nums.sort()
    const res = [], path = [], len = nums.length, used = new Array(len).fill(false)
    handle()
    return res
    function handle(){
        if(path.length === len){
            res.push([...path])
            return
        }
        for (let i = 0; i < len; i ++){
            if(i > 0 && nums[i] === nums[i - 1] && !used[i - 1] || used[i]){
                continue
            }
            path.push(nums[i])
            used[i] = true
            handle()
            path.pop()
            used[i] = false
        }
    }
}
console.log(fn([1,1,2,1]))
