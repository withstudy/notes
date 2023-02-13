// 给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
// 输入: [-2,1,-3,4,-1,2,1,-5,4]
// 输出: 6
// 解释: 连续子数组 [4,-1,2,1] 的和最大，为 6
function fn(nums) {
    let res = -Infinity, sum = 0
    for(let i = 0; i < nums.length; i ++){
        // 如果和加上当前元素 小于 当前元素，抛弃之前的元素，重新计算
        if(sum + nums[i] < nums[i]){
            sum = nums[i]
        }else{
            sum += nums[i]
        }

        res = Math.max(res, sum)
    }
    return res
}
console.log(fn([-2,1,-3,4,-1,2,1,-5,4]))
console.log(fn([-2,-4,-3,-1]))
console.log(fn([1,2,8,2]))
