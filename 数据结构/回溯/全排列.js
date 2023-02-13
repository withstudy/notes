function fn(nums) {
    const res = [], path=[], len = nums.length,used = new Array(len).fill(false)
    handle()
    return res
    function handle() {
        if(path.length === len){
            res.push([...path])
            return
        }
        for(let i = 0; i < len; i++){
            if(used[i]) continue
            path.push(nums[i])
            used[i] = true
            handle()
            used[i] = false
            path.pop()
        }
    }
}
console.log(fn([1,2,3]))
