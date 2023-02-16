// 给定一个正整数 n，将其拆分为至少两个正整数的和，并使这些整数的乘积最大化。 返回你可以获得的最大乘积。
//
// 示例 1:
//
// 输入: 2
// 输出: 1
//
// 示例 2:
//
// 输入: 10
// 输出: 36

function fn(n) {
    // dp[i]表示i 拆分得最大乘积
    // dp初始化为0，dp[2]为1
    const dp = new Array(n + 1).fill(0)
    dp[2] = 1
    for(let i = 3; i <= n; i ++){
        const m = Math.floor(i / 2)
        for(let j = 1; j <= m; j ++){
            // 递推公式Math.max(dp[i], j * (i - j), j * dp[i - j])
            dp[i] = Math.max(dp[i], j * (i - j), j * dp[i - j])
        }
    }
    return dp[n]
}

console.log(fn(2))
console.log(fn(10))
