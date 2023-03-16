// 给定 n 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。

// 求在该柱状图中，能够勾勒出来的矩形的最大面积。

// [2,1,5,6,2,3] 10
// [2,4] 4

function fn(nums){
    // 首尾添加 0 防止nums是升序的，导致无法触发计算结果
    nums = [0, ...nums, 0]
    const len = nums.length, stack = []
    let res = -Infinity
    for(let i = 0; i < len ; i ++){
        // 使用单调递减栈，nums[i] < 栈顶元素时，计算结果
        while(stack.length && nums[i] < nums[stack[stack.length - 1]]){
            // 高度，栈顶元素值
            const mid = nums[stack.pop()]
            // 宽度，左边第一个比mid小的，右边第一个比mid小的，之间就是宽度
            const w = i - stack[stack.length - 1] -1
            // 面积
            const s = mid * w
            // 保存最大值
            res = Math.max(res, s)
        }
        stack.push(i)
    }

    return res
}

console.log(fn([2,1,5,6,2,3]))
console.log(fn([2,4]))