// 给定一个数组 prices ，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格。
//
// 你只能选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票。设计一个算法来计算你所能获取的最大利润。
//
// 返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 0 。
//
// 示例 1：
// 输入：[7,1,5,3,6,4]
// 输出：5
// 解释：在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；
// 同时，你不能在买入前卖出股票。
//
// 示例 2：
// 输入：prices = [7,6,4,3,1]
// 输出：0
// 解释：在这种情况下, 没有交易完成, 所以最大利润为 0。

function fn(prices) {
    const len = prices.length
    // dp涵义：dp[i][0] 代表持有prices[i]获得最大利润，dp[i][1]代表不持有prices[i]获得最大利润
    const dp = new Array(len)
    // dp[0] = [-prices[0],0]，持有prices[0]获得最大利润是-prices[0]，不持有prices[i]获得最大利润0
    dp[0] = [-prices[0],0]
    for(let i = 1; i < len; i ++){
        // 递推公式：dp[i] = [
        //     Math.max(-prices[i],dp[i - 1][0]),  求最小花费
        //     Math.max(dp[i - 1][0] + prices[i], dp[i - 1][1])   求最大利润
        // ]
        dp[i] = [
            Math.max(-prices[i],dp[i - 1][0]),
            Math.max(dp[i - 1][0] + prices[i], dp[i - 1][1])
        ]
    }
    return dp[len - 1][1]
}

console.log(fn([7,1,5,3,6,4]))
console.log(fn([7,6,4,3,1]))
console.log("--------")
// 双指针
function fn2(prices) {
    let len = prices.length, left = 0, right = len - 1, res = 0
    while (left <= right){
        if(prices[left] > prices[right]){
            left ++
        } else{
            res = Math.max(res, prices[right] - prices[left])
            right --
        }
    }
    return res
}
console.log(fn2([7,1,5,3,6,4]))
console.log(fn2([7,6,4,3,1]))
