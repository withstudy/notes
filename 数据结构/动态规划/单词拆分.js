// 给定一个非空字符串 s 和一个包含非空单词的列表 wordDict，判定 s 是否可以被空格拆分为一个或多个在字典中出现的单词。
// 示例 1：
//
// 输入: s = "leetcode", wordDict = ["leet", "code"]
// 输出: true
// 示例 2：
//
// 输入: s = "applepenapple", wordDict = ["apple", "pen"]
// 输出: true
// 示例 3：
//
// 输入: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
// 输出: false

function fn(s,wordDict) {
    const len = s.length
    const dp = new Array(len + 1).fill(false)
    dp[0] = true
    for(let i = 1; i <= len; i ++){ // 背包
        for(let j = 0; j < i; j ++){ // 物品
            const str = s.slice(j, i)
            if(wordDict.includes(str) && dp[j]){
                dp[i] = true
                break
            }
        }
    }
    // console.log(dp)
    return dp[len]
}

console.log(fn("leetcode", ["leet", "code"]))
console.log(fn("applepenapple", ["apple", "pen"]))
console.log(fn("catsandog", [["cats", "dog", "sand", "and", "cat"]]))
