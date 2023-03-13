// 给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。

// 示例 1：

// 输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
// 输出：6
// 解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。
// 示例 2：

// 输入：height = [4,2,0,3,2,5]
// 输出：9
function fn(heights){
    let sum = 0, left = 0, right = heights.length - 1, lmax = 0, rmax = 0
    while(left < right){
        lmax = Math.max(lmax, heights[left])
        rmax = Math.max(rmax, heights[right])
        if(heights[left] < heights[right]){
            sum += lmax - heights[left]
            left ++
        } else {
            sum += rmax - heights[right]
            right --
        }
    }
    return sum
}

function fn2(height) {
    let left = [], right = [];
    let n = height.length;

    left[0] = height[0];
    for (let i = 1; i < n; i++) {
        left[i] = Math.max(height[i], left[i - 1]);
    }
    console.log(left)

    right[n - 1] = height[n - 1];
    for (let j = n - 2; j >= 0; j--) {
        right[j] = Math.max(height[j], right[j + 1]);
    }
    console.log(right)

    let ans = 0;
    for (let k = 0; k < n; k++) {
        ans += Math.min(left[k], right[k]) - height[k];
    }
    return ans;
};

// console.log(fn([0,1,0,2,1,0,1,3,2,1,2,1]))
// console.log(fn([4,2,0,3,2,5]))
// [0,1,0,2,1,0,1,3,2,1,2,1]
// lmax = 0, rmax = 1, sum = 0, left = 1, right = 11
// lmax = 1, rmax = 1, sum = 0, left = 1, right = 10
// lmax = 1, rmax = 2, sum = 0, left = 2, right = 10
// lmax = 1, rmax = 2, sum = 1, left = 3, right = 10
// lmax = 2, rmax = 2, sum = 1, left = 3, right = 9
// lmax = 2, rmax = 2, sum = 2, left = 3, right = 9
// lmax = 2, rmax = 2, sum = 2, left = 3, right = 8
// lmax = 2, rmax = 2, sum = 2, left = 3, right = 7
// lmax = 2, rmax = 3, sum = 2, left = 4, right = 7
// lmax = 2, rmax = 3, sum = 3, left = 5, right = 7
// lmax = 2, rmax = 3, sum = 5, left = 6, right = 7
// lmax = 2, rmax = 3, sum = 6, left = 7, right = 7

console.log(fn2([0,1,0,2,1,0,1,3,2,1,2,1]))
// console.log(fn2([4,2,0,3,2,5]))
// [0, 1, 1, 2, 2, 2, 2, 3, 3, 3,3, 3]
// [3, 3, 3, 3, 3, 3, 3, 3, 2, 2,2, 1]