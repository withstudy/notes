---
title: 300. 最长递增子序列
date: 2022-04-05 14:18:27
categories: 算法
tags: [算法]
description: 学习总结
cover: https://s2.loli.net/2022/02/18/TBbHCRsA2L59zng.jpg
---
# 5. 最长回文子串
给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。

子序列是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。例如，[3,6,2,7] 是数组 [0,3,1,6,2,2,7] 的子序列。




> 示例 1：
> 
> 输入：nums = [10,9,2,5,3,7,101,18]
> 
> 输出：4
> 
> 解释：最长递增子序列是 [2,3,7,101]，因此长度为 4 。 
> 
> 示例 2：
> 
> nums = [0,1,0,3,2,3]
> 
> 输出：4

```js
var lengthOfLIS = function(nums) {
    const dp = new Array(nums.length).fill(1);//初始化dp 赋值 1
    let res = 1;//最大递增序列数
    for(let i=1;i<nums.length;i++){
        for(let j=0;j<i;j++){
            if(nums[i] > nums[j]){//如果当前nums[i]>nums[0<j<i] 那么dp[i]=Math.max(dp[i]，dp[0<j<i]+1)
                dp[i] = Math.max(dp[i],dp[j]+1);
            }
        }
        res = Math.max(dp[i],res);
    }
    return res;
};
```
