// 给定一个非负整数数组，你最初位于数组的第一个位置。
// 数组中的每个元素代表你在该位置可以跳跃的最大长度。
// 判断你是否能够到达最后一个位置。
// 输入: [2,3,1,1,4]
// 输出: true
// 解释: 我们可以先跳 1 步，从位置 0 到达 位置 1, 然后再从位置 1 跳 3 步到达最后一个位置。

function fn(nums) {
    // 储存数字可以跳跃的长度面积
    let cover = 0
    for(let i = 0; i <= cover; i++){
        // 当前可跳跃面积 + 加上nums[i] 等于新的可跳跃面积
        cover = Math.max(i + nums[i], cover)
        // 如果可跳跃面积超过了数组的长度，就是可以跳跃到结尾的
        if(cover >= nums.length - 1) return true
    }
    return false
}

console.log(fn([2,3,1,1,4]))
console.log(fn([2,3,1,1,0,4]))
