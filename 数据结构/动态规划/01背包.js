// 有n件物品和一个最多能背重量为w 的背包。第i件物品的重量是weight[i]，得到的价值是value[i] 。每件物品只能用一次，求解将哪些物品装入背包里物品价值总和最大
function fn(w,weights,values) {
    const n = weights.length // 物品数量
    // i 表示第一个物品  j 表示背包容量  dp[i][j]表示 j容量 0 ~ i物品 能够存储的最大价值
    const dp = new Array(n).fill().map(() => new Array(w + 1).fill(0))
    // 第一行表示只有一个物品时,不管多少容量,最大的价值都是这个物品的价值
    for(let i = 1; i <= w; i ++){
        dp[0][i] = values[0]
    }

    for(let i = 1; i < n; i ++){ //物品
        for(let j = 0; j <= w; j ++){ //容量
            if(j < weights[i]){
                // 背包容量小于物品重量  选择不装,那么价值就是dp[i - 1][j]
                dp[i][j] = dp[i - 1][j]
            } else {
                // 比较装了和不装之后,拥有的价值最高
                // 递推公式: Math.max(dp[i - 1][j],dp[i][j - weights[i]] + values[i])
                dp[i][j] = Math.max(dp[i - 1][j],dp[i][j - weights[i]] + values[i])
            }
        }
    }

    console.table(dp)

    return dp[n-1][w]
}

function fn1(w,weights,values) {
    const n = weights.length
    const dp = new Array(w + 1).fill(0)
    for(let i = 1; i <= n; i ++){
        for(let j = w; j >= weights[i - 1]; j --){
            dp[j] = Math.max(dp[j], dp[j - weights[i - 1]] + values[i - 1])
        }
        console.log(dp)
    }
    return dp[w]
}

console.log(fn(4,[1,3,4],[15,20,30]))
console.log(fn1(4,[1,3,4],[15,20,30]))

// ┌─────────┬───┬────┬────┬────┬────┐
// │ (index) │ 0 │ 1  │ 2  │ 3  │ 4  │
// ├─────────┼───┼────┼────┼────┼────┤
// │    0    │ 0 │ 15 │ 15 │ 15 │ 15 │
// │    1    │ 0 │ 15 │ 15 │ 20 │ 35 │
// │    2    │ 0 │ 15 │ 15 │ 20 │ 35 │
// └─────────┴───┴────┴────┴────┴────┘



