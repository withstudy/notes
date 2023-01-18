function fn(n,k){
    const res = []
    const path = []
    function r(i=1){
        if(path.length === k){
            res.push([...path])
            return
        }
        // n - (k - path.length) + 1  剪枝
        // 4 - (2 - 0) + 1    3 ∵ path.length = 0, ∴ i至多从3开始取 如果从4开始收集，只会有一个元素，没有遍历的意义
        // 4 - (2 - 1) + 1    4 ∵ path.length = 1, ∴ i至多从4开始取 因为只需要取一个元素
        for(;i <= n - (k - path.length) + 1 ;++ i){
            path.push(i)
            r(i + 1)
            // 回溯
            path.pop()
        }
    }
    r()
    return res
}

console.log(fn(4,2))
