// 给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。

// 示例 1：

// 输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
// 输出：6
// 解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。
// 示例 2：

// 输入：height = [4,2,0,3,2,5]
// 输出：9

function fn(height){
    const len = height.length, stack = []
    let res = 0
    for(let i = 0; i < len; i ++){
        
        while(stack.length && height[i] > height[stack[stack.length - 1]]){
            // mid 中间一个数的下表
            const mid = stack.pop()
            if(!stack.length) continue
            // h mid右边第一个比他大的高度与栈顶是昨天第一个比他大的高度，取最小值，减去mid的高度，就是mid可以接的雨水
            // w 宽度
            const h = Math.min(height[i],height[stack[stack.length - 1]]) - height[mid], w = i - stack[stack.length - 1] - 1
            res += h * w 
        }

        stack.push(i)
    }

    return res
}

console.log(fn([0,1,0,2,1,0,1,3,2,1,2,1]))
console.log(fn([4,2,0,3,2,5]))