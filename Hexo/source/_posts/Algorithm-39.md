---
title: 39. 组合总和
date: 2022-06-24 11:33:20
categories: 算法
tags: [算法]
description: 学习总结
cover: https://s2.loli.net/2022/02/18/TBbHCRsA2L59zng.jpg
---
# 39. 组合总和
给你一个 无重复元素 的整数数组 candidates 和一个目标整数 target ，找出 candidates 中可以使数字和为目标数 target 的 所有 不同组合 ，并以列表形式返回。你可以按 任意顺序 返回这些组合。

candidates 中的 同一个 数字可以 无限制重复被选取 。如果至少一个数字的被选数量不同，则两种组合是不同的。

对于给定的输入，保证和为 target 的不同组合数少于 150 个。


> 示例 1：
> 
> 输入：candidates = [2,3,6,7], target = 7
> 
> 输出：[[2,2,3],[7]]
> 
> 解释：
> 
> 2 和 3 可以形成一组候选，2 + 2 + 3 = 7 。注意 2 可以使用多次。
> 
> 7 也是一个候选， 7 = 7 。
> 
> 仅有这两种组合。
> 
> 示例 2：
> 
> 输入：candidates = [2,3,5], target = 8
> 
> 输出： [[2,2,2,2],[2,3,3],[3,5]]

```js
var combinationSum = function(candidates, target) {
    let res = [],path = [];
    candidates.sort((a,b) => a-b);//先排序
    fn(0,0);
    return res;
    function fn(j,sum){
        if(sum > target)return ;// 和已经大于目标值 该次不可能等于目标值了 结束
        if(sum === target) {res.push([...path]);return ;} ;// 找到目标值 结束
        for(let i = j;i<candidates.length;i++){
            const item = candidates[i];
            if(item > target - sum) continue;
            path.push(item);
            sum += item;
            fn(i,sum);//递归
            path.pop();// 回溯
            sum -= item;
        }
    }
};
```

**解析**

> 1、先排序数组，主要作用是在后面比较是，如果当前的和大于了目标值，就不需要继续计算下去了
> 
> 2、递归中，结束条件有 如果和已经大于目标值 该次不可能等于目标值了 结束；如果和等于目标值，表示找到一组添加到res中 结束
> 
