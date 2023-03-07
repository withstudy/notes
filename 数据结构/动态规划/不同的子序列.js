// 给定一个字符串 s 和一个字符串 t ，计算在 s 的子序列中 t 出现的个数。

// 字符串的一个 子序列 是指，通过删除一些（也可以不删除）字符且不干扰剩余字符相对位置所组成的新字符串。
// （例如，"ACE" 是 "ABCDE" 的一个子序列，而 "AEC" 不是）

// s = 'rebbbit' t = 'rebbit'   3
// s = 'babgbag' t = 'bag'   5

function fn(s, t){
    // dp[i][j] 代表0~i-1 s 中 0~j-1 t 出现的个数
    const slen = s.length, tlen = t.length, dp = new Array(slen + 1).fill(0).map(() => new Array(tlen + 1).fill(0))
    for(let i = 0;i <= slen; i ++){
        dp[i][0] = 1
    }
    
    for(let i = 1; i <= slen; i ++){
        for(let j = 1; j <= tlen; j ++){
            if(s[i - 1] === t[j - 1]){
                // 相等时，考虑取不取s[i-1] dp[i - 1][j] 表示不取
                dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j]
            } else {
                // 不相等，直接不取
                dp[i][j] = dp[i - 1][j]
            }
        }
    }
    // console.table(dp);
    return dp[slen][tlen]
}

console.log(fn('rebbbit', 'rebbit'))
console.log(fn('babgbag', 'bag'))
console.log(fn('babgbag', ''))
// ┌─────────┬───┬───┬───┬───┐
// │ (index) │ 0 │ 1 │ 2 │ 3 │
// ├─────────┼───┼───┼───┼───┤
// │    0    │ 1 │ 0 │ 0 │ 0 │
// │    1    │ 1 │ 1 │ 0 │ 0 │s[0] === t[0] dp[1][1] = dp[0][0] + d[0][1]   | 1
// │    2    │ 1 │ 1 │ 1 │ 0 │
// │    3    │ 1 │ 2 │ 1 │ 0 │
// │    4    │ 1 │ 2 │ 1 │ 1 │
// │    5    │ 1 │ 3 │ 1 │ 1 │
// │    6    │ 1 │ 3 │ 4 │ 1 │
// │    7    │ 1 │ 3 │ 4 │ 5 │
// └─────────┴───┴───┴───┴───┘