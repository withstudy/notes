// 给定字符串 s 和 t ，判断 s 是否为 t 的子序列。

// 字符串的一个子序列是原始字符串删除一些（也可以不删除）字符而不改变剩余字符相对位置形成的新字符串。（例如，"ace"是"abcde"的一个子序列，而"aec"不是）。

// 示例 1： 输入：s = "abc", t = "ahbgdc" 输出：true

// 示例 2： 输入：s = "axc", t = "ahbgdc" 输出：false

function fn(s, t){
    const slen = s.length, tlen = t.length, dp = new Array(slen + 1).fill(0).map(() => new Array(tlen + 1).fill(0))
    for(let i = 1; i <= slen; i ++){
        for(let j = 1; j <= tlen; j ++){
            if(s[i - 1] === t[j - 1]){
                dp[i][j] = dp[i - 1][j - 1] + 1
            } else {
                // 只需要在t中删除 最长公共子序列 需要在两个字符串中删除
                dp[i][j] = dp[i][j - 1]
            }
        }
    }
    // console.table(dp);
    return dp[slen][tlen] === slen
}

console.log(fn("abc","ahbgdc"))
// ┌─────────┬───┬───┬───┬───┬───┬───┬───┐
// │ (index) │ 0 │ 1 │ 2 │ 3 │ 4 │ 5 │ 6 │
// ├─────────┼───┼───┼───┼───┼───┼───┼───┤
// │    0    │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │
// │    1    │ 0 │ 1 │ 1 │ 1 │ 1 │ 1 │ 1 │
// │    2    │ 0 │ 0 │ 0 │ 2 │ 2 │ 2 │ 2 │
// │    3    │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 3 │
// └─────────┴───┴───┴───┴───┴───┴───┴───┘
console.log(fn("axc","ahbgdc"))