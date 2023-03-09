// 给定一个字符串 s ，找到其中最长的回文子序列，并返回该序列的长度。可以假设 s 的最大长度为 1000 。

// 示例 1: 输入: "bbbab" 输出: 4 一个可能的最长回文子序列为 "bbbb"。

// 示例 2: 输入:"cbbd" 输出: 2 一个可能的最长回文子序列为 "bb"。

function fn(s){
    // dp[i][j] 表示i~j的s字符串中的最长回文子序列
    const len = s.length, dp = new Array(len).fill(0).map(() => new Array(len).fill(0))
    // 初始化，dp[i][i]也就是每个字符本身，最长回文子序列等于1
    for(let i = 0; i < len; i ++){
        dp[i][i] = 1
    }
    // 遍历顺序，从左下往右上遍历
    for(let i = len - 1; i >= 0; i --){
        // 为什么j=i+1，不是j=i，因为dp[i][i]已经初始化了
        for(let j = i + 1; j < len; j ++){
            if(s[i] === s[j]){
                // 相等，最长回文子序列长度+2
                dp[i][j] = dp[i + 1][j - 1] + 2
            } else {
                // 不相等，却i~j-1与i+1~j，也就是取或不取s[i]或s[j]的时候的最长回文子序列
                dp[i][j] = Math.max(dp[i][j - 1], dp[i + 1][j])
            }
        }
    }
    // console.table(dp);
    return dp[0][len - 1]
}

console.log(fn('bbbab'))
console.log(fn('cbbd'))