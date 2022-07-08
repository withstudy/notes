---
title: 5. 最长回文子串
date: 2022-03-15 10:08:27
categories: 算法
tags: [算法]
description: 学习总结
cover: https://s2.loli.net/2022/02/18/TBbHCRsA2L59zng.jpg
---
# 5. 最长回文子串
给你一个字符串 s，找到 s 中最长的回文子串。


> 示例 1：
> 
> 输入：s = "babad"
> 
> 输出："bab"
> 
> 解释："aba" 同样是符合题意的答案。 
> 
> 示例 2：
> 
> 输入：s = "cbbd"
> 
> 输出："bb"

```js
var longestPalindrome = function(s) {
    let res = '';
    const n = s.length;
    const dp = Array.from(Array(n), () => Array(n).fill(false));
    for(let i = n - 1;i >= 0;i--){
        for(let j = i;j < n;j++){
            dp[i][j] = s[i] === s[j] && (j - i < 2 || dp[i+1][j-1]);
            if(dp[i][j] && j-i+1 > res.length){
                res = s.substring(i,j+1);
            }
        }
    }
    return res;
};
```

**解析**

> 1、先创建一个`s`长度的二位数组，并填充为`false`（`dp[i][j]`代表的是i~j是否为回文字符串）
> 
> 2、从`s`字符串的尾部开始遍历
> 
> `dp[i][j]`为回文字符串有三种情况（前提`s[i] === s[j]`）
> 
> * `j - i === 0` 代表一个字符，一个字符肯定是回文字符串
> 
> * `j - i < 2` 代表两个字符（包括第一种情况）,两个字符且`s[i] === s[j]`那么一定是回文字符串
> 
> * `j - i > 2` 代表两个字符以上且`s[i] === s[j]`，那么如果`s[i+1] ~ s[j-1]`是回文，也就是`dp[i+1][j-1]`为`true`
> 比如: `abba`，`i=0,j=3`，`s[i] === s[j]`，`s[i+1] ~ s[j-1]`也就是`bb`，也是一个回文字符串，所以`abba`也是一个回文字符串