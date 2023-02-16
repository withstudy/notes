// 给定一个整数 n，求以 1 ... n 为节点组成的二叉搜索树有多少种？
//
// 示例:
//
// 输入: 3
// 输出: 5

function fn(n) {
    // dp[i]代表i 可以构成dp[i]种二叉搜索树
    const dp = new Array(n + 1).fill(0)
    dp[0] = 1
    for(let i = 1; i <= n; i ++){
        for(let j = 1; j <= i; j ++){
            // 递推公式：dp[i] += dp[j - 1] * dp[i - j]
            dp[i] += dp[j - 1] * dp[i - j]
        }
    }
    return dp[n]
}

console.log(fn(1))
console.log(fn(2))
console.log(fn(3))
