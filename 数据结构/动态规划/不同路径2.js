// 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为“Start” ）。
// 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）。
// 现在考虑网格中有障碍物。那么从左上角到右下角将会有多少条不同的路径？
//
// 输入：obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
// 输出：2
//
// 输入：obstacleGrid = [[0,1],[0,0]]
// 输出：1
function fn(obs) {
    const m = obs.length, n = obs[0].length
    // 特殊处理，障碍在obs[0][0]开始   obs[m - 1][n - 1]结束位置是，路径为0
    if(obs[0][0] || obs[m - 1][n - 1]) return 0
    const dp = new Array(m).fill(new Array(n))
    // 初始化第一行和第一列，如果遇到障碍，之后的路径初始化为0
    for(let i = 0; i < m; i ++){
        dp[i][0] = !obs[i][0] ? 1 : 0
    }
    for(let i = 0; i < n; i ++){
        dp[0][i] = !obs[0][i] ? 1 : 0
    }

    for(let i = 1; i < m; i ++){
        for(let j = 1; j < n; j ++){
            // 如果i，j位置有障碍，dp[i][j]=0，及可到达路径为0
            dp[i][j] = obs[i][j] ? 0 : dp[i - 1][j] + dp[i][j - 1]
        }
    }
    return dp[m - 1][n - 1]
}

console.log(fn([[0,0,0],[0,1,0],[0,0,0]]))
console.log(fn([[0,1],[0,0]]))
console.log(fn([[1,0],[0,0]]))
console.log(fn([[0,0],[0,1]]))
