// 如果连续数字之间的差严格地在正数和负数之间交替，则数字序列称为摆动序列。
// 第一个差（如果存在的话）可能是正数或负数。少于两个元素的序列也是摆动序列。
// 输入: [1,7,4,9,2,5]
// 输出: 6
// 解释: 整个序列均为摆动序列。

function fn(nums) {
    // 少于一个元素直接返回数组长度
    if(nums.length <= 1) return nums.length
    let res = 1, pre = 0, cur = 0
    for(let i = 0; i < nums.length - 1; i ++){
        // 后一个减去当前元素
        cur = nums[i + 1] - nums[i]
        // 上一个坡度为递增，且当前坡度为递减
        // 上一个坡度为递减，且当前坡度为递增
        if((pre >= 0 && cur < 0) || (pre <= 0 && cur > 0)){
            res ++
            pre = cur
        }
    }
    return res
}

console.log(fn([1,7,4,9,2,5]))
console.log(fn([1,2,2,2,3,4]))
