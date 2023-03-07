// 给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

// 示例: 输入: [-2,1,-3,4,-1,2,1,-5,4] 输出: 6 解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。

function fn(nums){
    const len = nums.length, dp = new Array(len).fill(0)
    let res = dp[0] = nums[0]
    for(let i = 1; i < len; i ++){
        dp[i] = Math.max(nums[i], dp[i - 1] + nums[i])
        res = Math.max(dp[i],res)
    }
    return res
}
console.log(fn([-2,1,-3,4,-1,2,1,-5,4]))