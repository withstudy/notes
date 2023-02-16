// 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。
// 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish” ）。
// 问总共有多少条不同的路径？
//
// 示例 1：
//
// 输入：m = 3, n = 7
// 输出：28
// 示例 2：
//
// 输入：m = 2, n = 3
// 输出：3

function fn(m,n) {
    // dp[i][j]代表到达 [i][j] 有 dp[i][j]种不同路径
    const dp = new Array(m).fill(new Array(n))
    // 初始化第一行为1
    for(let i = 0; i < m; i ++){
        dp[i][0] = 1
    }
    // 初始化第一列为1
    for(let i = 0; i < n; i ++){
        dp[0][i] = 1
    }
    // 遍历从左到右，从上往下
    for(let i = 1; i < m; i ++){
        for(let j = 1; j < n; j ++){
            // 递推公式：dp[i][j - 1] + dp[i - 1][j]
            dp[i][j] = dp[i][j - 1] + dp[i - 1][j]
        }
    }
    console.table(dp)
    return dp[m - 1][n - 1]
}

console.log(fn(3,7))
console.log(fn(2,3))
