// 给定两个单词 word1 和 word2，找到使得 word1 和 word2 相同所需的最小步数，每步可以删除任意一个字符串中的一个字符。

// 示例：

// 输入: "sea", "eat"
// 输出: 2
// 解释: 第一步将"sea"变为"ea"，第二步将"eat"变为"ea"

function fn(word1, word2) {
    // dp[i][j] 表示以 i-1 结尾的word1和以 j-1 结尾的word2 最小步数
    const w1Len = word1.length, w2Len = word2.length, dp = new Array(w1Len + 1).fill(0).map(() => new Array(w2Len + 1).fill(0))
    // 初始化：空字符串与单词比较，最小步数就应该是单词的长度
    for(let i = 0; i <= w1Len; i ++) {
        dp[i][0] = i
    }

    for(let i = 0; i <= w2Len; i ++) {
        dp[0][i] = i
    }

    for(let i = 1; i <= w1Len; i ++) {
        for(let j = 1; j <= w2Len; j ++){
            if(word1[i - 1] === word2[j - 1]){
                // 相等，不需要操作
                dp[i][j] = dp[i - 1][j - 1]
            } else {
                // 不相等，可以删除word1，也可以删除word2，还可以两个都删除，求一个最小值
                dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + 2)
            }
        }
    }

    console.table(dp);

    return dp[w1Len][w2Len]
}
// todo:思路2，求出最长子序列，然后word1+word2减去子序列长度，就得到最小操作步数
function fn1(word1, word2){
    const w1Len = word1.length, w2Len = word2.length, dp = new Array(w1Len + 1).fill(0).map(() => new Array(w2Len + 1).fill(0))
    let res = 0

    for(let i = 1; i <= w1Len; i ++){
        for(let j = 1; j <= w2Len; j ++){
            if(word1[i - 1] === word2[j - 1]){
                dp[i][j] = dp[i - 1][j - 1] + 1
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
            }
            res = Math.max(dp[i][j], res)
        }
    }

    return (w1Len + w2Len) - 2 * res
}

console.log(fn("sea","eat"))
console.log(fn1("sea","eat"))
// ┌─────────┬───┬───┬───┬───┐
// │ (index) │ 0 │ 1 │ 2 │ 3 │
// ├─────────┼───┼───┼───┼───┤
// │    0    │ 0 │ 1 │ 2 │ 3 │
// │    1    │ 1 │ 2 │ 3 │ 4 │
// │    2    │ 2 │ 1 │ 2 │ 3 │
// │    3    │ 3 │ 2 │ 1 │ 2 │
// └─────────┴───┴───┴───┴───┘
console.log(fn("sea","sea"))
console.log(fn1("sea","sea"))