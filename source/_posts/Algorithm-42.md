---
title: 42. 接雨水
date: 2022-03-17 11:14:27
categories: 算法
tags: [算法]
description: 学习总结
cover: https://s2.loli.net/2022/02/18/TBbHCRsA2L59zng.jpg
---
# 42. 接雨水
给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。

![](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/10/22/rainwatertrap.png)
> 示例 1：
> 
> 输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
> 
> 输出：6
> 
> 解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。

```js
var trap = function(height) {
    let sum = 0;
    let left = 0,right = height.length-1;
    let lMax = 0;rMax = 0;
    while(left < right){
        lMax = Math.max(lMax,height[left]);//左边最大值
        rMax = Math.max(rMax,height[right]);//右边最大值
        if(height[left] < height[right]){
            sum += lMax - height[left];
            left ++;
        }else{
            sum += rMax - height[right];
            right --;
        }
    }
    return sum;
};
```

