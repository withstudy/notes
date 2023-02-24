// 给定不同面额的硬币和一个总金额。写出函数来计算可以凑成总金额的硬币组合数。假设每一种面额的硬币有无限个。
//
// 示例 1:
//
// 输入: amount = 5, coins = [1, 2, 5]
// 输出: 4
// 解释: 有四种方式可以凑成总金额:
//
// 输入: amount = 3, coins = [2]
// 输出: 0
// 解释: 只用面额2的硬币不能凑成总金额3。
// 示例 3:
//
// 输入: amount = 10, coins = [10]
// 输出: 1

function fn(amount, coins) {
    // dp[j]代表 j金额，有dp[j]种组合方式
    const len = coins.length, dp = new Array(amount + 1).fill(0)
    // dp[0]初始化为1
    dp[0] = 1
    for(let i = 0; i < len; i ++){  // 背包（金额）
        for(let j = coins[i]; j <= amount; j ++){ // 容量（总金额）
            // 递推公式：dp[j] += dp[j - coins[i]]
            dp[j] += dp[j - coins[i]]
        }
    }
    return dp[amount]
}

console.log(fn(5,[1,2,5]))
console.log(fn(3,[2]))
console.log(fn(10,[10]))
