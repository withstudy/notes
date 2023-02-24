// 给定不同面额的硬币 coins 和一个总金额 amount。编写一个函数来计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 -1。
//
// 你可以认为每种硬币的数量是无限的。
//
// 示例 1：
//
// 输入：coins = [1, 2, 5], amount = 11
// 输出：3
// 解释：11 = 5 + 5 + 1
// 示例 2：
//
// 输入：coins = [2], amount = 3
// 输出：-1
// 示例 3：
//
// 输入：coins = [1], amount = 0
// 输出：0
// 示例 4：
//
// 输入：coins = [1], amount = 1
// 输出：1
// 示例 5：
//
// 输入：coins = [1], amount = 2
// 输出：2

function fn(coins, amount) {
    // dp[j]代表 凑成j金额 有dp[j]种方式
    // 因为求最少方式，dp初始化为Infinity
    const len = coins.length, dp = new Array(amount + 1).fill(Infinity)
    // dp[0]初始化为0
    dp[0] = 0
    for(let i = 0; i < len; i ++){ // 物品（硬币）
        for(let j = coins[i]; j <= amount; j ++){ // 背包（金额）
            // 递推公式：dp[j] = Math.min(dp[j],dp[j - coins[i]] + 1)
            dp[j] = Math.min(dp[j],dp[j - coins[i]] + 1)
        }
    }

    return dp[amount] === Infinity ? -1 : dp[amount]
}

console.log(fn([1, 2, 5], 11))
console.log(fn([2], 3))
console.log(fn([1], 0))
console.log(fn([1], 2))
