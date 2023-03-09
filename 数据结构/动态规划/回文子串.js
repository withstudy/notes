// 给定一个字符串，你的任务是计算这个字符串中有多少个回文子串。

// 具有不同开始位置或结束位置的子串，即使是由相同的字符组成，也会被视作不同的子串。

// 示例 1：

// 输入："abc"
// 输出：3
// 解释：三个回文子串: "a", "b", "c"
// 示例 2：

// 输入："aaa"
// 输出：6
// 解释：6个回文子串: "a", "a", "a", "aa", "aa", "aaa"

function fn(s){
    // dp[i][j] 表示i~j 的s是否是回文子串
    // 初始化false
    const len = s.length, dp = new Array(len).fill(0).map(() => new Array(len).fill(false))
    let res = 0
    // 遍历顺序：从左下往右上遍历
    for(let i = len - 1; i >= 0; i --){
        for(let j = i; j < len; j ++){
            if(s[i] === s[j]){
                if(j - i <= 1){
                    // 当i~j 之间的字符串是一位两位时，且s[i] === s[j],那该字符串必定时回文子串
                    dp[i][j] = true
                } else {
                    // 当i~j 之间字符串超过两位，且s[i] === s[j]，那该字符串是不是回文子串依赖于i+1~j-1是否为回文子串
                    dp[i][j] = dp[i + 1][j - 1]
                }
            }
            dp[i][j] && res ++
        }
    }

    return res
}

console.log(fn('aaa'))
console.log(fn('abc'))