// 有一堆石头，每块石头的重量都是正整数。
//
// 每一回合，从中选出任意两块石头，然后将它们一起粉碎。假设石头的重量分别为 x 和 y，且 x <= y。那么粉碎的可能结果如下：
//
// 如果 x == y，那么两块石头都会被完全粉碎；
//
// 如果 x != y，那么重量为 x 的石头将会完全粉碎，而重量为 y 的石头新重量为 y-x。
//
// 最后，最多只会剩下一块石头。返回此石头最小的可能重量。如果没有石头剩下，就返回 0。
//
// 示例：
//
// 输入：[2,7,4,1,8,1]
// 输出：1
// 思路：将石头分为体积差不多的两部分，最后相撞，剩下的就是最小的
function fn(nums){
    const sum = nums.reduce((pre,num) => pre + num, 0)
    const target = Math.floor(sum / 2)
    // dp[i]表示i容量下装的最大重量
    // dp初始化为0
    const dp = new Array(target + 1).fill(0)
    for(let i = 0;i < target; i ++){
        for(let j = target; j >= nums[i]; j --){
            dp[j] = Math.max(dp[j], dp[j - nums[i]] + nums[i])
        }
    }
    return sum - dp[target] - dp[target]
}

console.log(fn([2,7,4,1,8,1]))
console.log(fn([2,7,4,1,8,10]))
