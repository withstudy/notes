// 在一条环路上有 N 个加油站，其中第 i 个加油站有汽油 gas[i] 升。
// 你有一辆油箱容量无限的的汽车，从第 i 个加油站开往第 i+1 个加油站需要消耗汽油 cost[i] 升。你从其中的一个加油站出发，开始时油箱为空。
// 如果你可以绕环路行驶一周，则返回出发时加油站的编号，否则返回 -1
// gas = [1,2,3,4,5]
// cost = [3,4,5,1,2]
// 输出: 3

// gas = [2,3,4]
// cost = [3,4,3]
// 输出: -1
function fn(gas,cost) {
    let sum = 0,total = 0, start = 0
    for(let i = 0; i < gas.length; i ++){
        const s = gas[i] - cost[i]
        // 计算i之前剩余的油量
        sum += s
        // 计算所有的剩余的油量
        total += s
        if(sum < 0){
            // i之前剩余油量少于0，那么重新从 i+1 开始计算
            start = i + 1
            sum = 0
        }
    }
    // 如果所有剩余油量少于0，那么永远不会跑完一圈
    if(total < 0) return -1
    return start
}

console.log(fn([1,2,3,4,5],[3,4,5,1,2]))
console.log(fn([2,3,4],[3,4,3]))
