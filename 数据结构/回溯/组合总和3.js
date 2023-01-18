// 找到和为n个数为k的组合
function fn(n,k){
    const res = []
    const path = []
    let sum = 0
    function r(i=1){
        // 如果sum 已经大于n不在继续
        if(sum > n) return
        if(path.length === k && sum === n){
            res.push([...path])
            return
        }
        // n - (k - path.length) + 1  剪枝
        for (;i <= n - (k - path.length) + 1;++i){
            path.push(i)
            sum += i
            r(i+1)
            sum -= i
            path.pop()
        }
    }

    r()

    return res
}

console.log(fn(9,3))
