// 给定一个由正整数组成且不存在重复数字的数组，找出和为给定目标正整数的组合的个数。
//
// 示例:
//
//     nums = [1, 2, 3]
// target = 4
//
// 因此输出为 7

function fn(nums,target) {
    const len = nums.length, dp = new Array(target + 1).fill(0)
    dp[0] = 1
    for(let i = 0; i <= target; i ++){  // 物品
        for(let j = 0; j < len; j ++){  // 容量
            if (i >= nums[j]) {
                dp[i] += dp[i - nums[j]];
            }
        }
    }
    return dp[target]
}

console.log(fn([1, 2, 3], 4))
