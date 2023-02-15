// 老师想给孩子们分发糖果，有 N 个孩子站成了一条直线，老师会根据每个孩子的表现，预先给他们评分。
// 你需要按照以下要求，帮助老师给这些孩子分发糖果：
// 每个孩子至少分配到 1 个糖果。
// 相邻的孩子中，评分高的孩子必须获得更多的糖果。
//
// 示例 1:
//
// 输入: [1,0,2]
// 输出: 5
// 解释: 你可以分别给这三个孩子分发 2、1、2 颗糖果。
// 示例 2:
//
// 输入: [1,2,2]
// 输出: 4

function fn(nums) {
    let count = new Array(nums.length).fill(1),res = 0
    for(let i = 1; i < nums.length; i ++){
        if(nums[i] > nums[i - 1]){
            count[i] = count[i - 1] + 1
        }
    }
    for(let i = nums.length - 2;i >= 0;i --){
        if(nums[i] > nums[i + 1]){
            count[i] = Math.max(count[i], count[i + 1] + 1)
        }
    }

    for (let i = 0; i < count.length; i ++){
        res += count[i]
    }
    return res
}

console.log(fn([1,0,2]))
console.log(fn([1,2,2]))
console.log(fn([1,2,2,5,4,3,2]))
