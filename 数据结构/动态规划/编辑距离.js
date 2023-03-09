// 给你两个单词 word1 和 word2，请你计算出将 word1 转换成 word2 所使用的最少操作数 。

// 你可以对一个单词进行如下三种操作：

// 插入一个字符

// 删除一个字符

// 替换一个字符

// 示例 1：

// 输入：word1 = "horse", word2 = "ros"

// 输出：3

// 解释： horse -> rorse (将 'h' 替换为 'r') rorse -> rose (删除 'r') rose -> ros (删除 'e')

// 示例 2：

// 输入：word1 = "intention", word2 = "execution"

// 输出：5

function fn(word1, word2){
    const w1Len = word1.length, w2Len = word2.length, dp = new Array(w1Len + 1).fill(0).map(() => new Array(w2Len + 1).fill(0))

    for(let i = 0; i <= w1Len; i ++){
        dp[i][0] = i
    }

    for(let i = 0; i <= w1Len; i ++){
        dp[0][i] = i
    }

    for(let i = 1; i <= w1Len; i ++){
        for(let j = 1; j <= w2Len; j ++){
            if(word1[i - 1] === word2[j - 1]){
                dp[i][j] = dp[i - 1][j - 1]
            } else {
                //不相等，考虑删除（word1，word2），替换
                dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + 1)
            }
        }
    }

    return dp[w1Len][w2Len]
}

console.log(fn("horse","ros"))
console.log(fn("intention","execution"))