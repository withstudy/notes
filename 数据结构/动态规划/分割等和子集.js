// 给定一个只包含正整数的非空数组。是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。
//
// 注意: 每个数组中的元素不会超过 100 数组的大小不会超过 200
//
// 示例 1:
//
// 输入: [1, 5, 11, 5]
// 输出: true
// 解释: 数组可以分割成 [1, 5, 5] 和 [11].
//     示例 2:
//
// 输入: [1, 2, 3, 5]
// 输出: false
// 解释: 数组不能分割成两个元素和相等的子集.
// 思路：将数组求和，然后分为两部分，如果不能整除，返回false
//      如果两部分的和不相等 返回false
//
function fn(nums){
    let sum = 0, len = nums.length
    for(let i = 0; i < len; i ++){
        sum += nums[i]
    }
    // 不能整除 返回false
    if (sum & 1) return false
    const target = Math.floor(sum / 2)
    // dp[i]表示最大的和
    // dp初始化为0
    const dp = new Array(target + 1).fill(0)
    for(let i = 0; i < len; i++){
        for(let j = target; j >= nums[i]; j --){
            dp[j] = Math.max(dp[j], dp[j - nums[i]] + nums[i])
            if(dp[j] === target){
                return true
            }
        }
    }
    console.log(dp)
    return dp[target] === target
}

console.log(fn([1, 5, 11, 5]))
console.log(fn([1, 2, 3, 5]))
console.log(fn([11,11]))
