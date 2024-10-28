// 给你一个整数数组 nums 和一个整数 k ，请你统计并返回 该数组中和为 k 的子数组的个数 。

// 子数组是数组中元素的连续非空序列。

 

// 示例 1：

// 输入：nums = [1, 1, 1], k = 2
// 输出：2
// 示例 2：

// 输入：nums = [1, 2, 3], k = 3
// 输出：2
var subarraySum = function (nums, k) {
    const map = new Map()
    map.set(0, 1)
    let pre = 0, count = 0
    for (let i of nums) {
        pre += i
        if (map.has(pre - k)) {
            count += map.get(pre - k)
        }

        if (map.has(pre)) {
            map.set(pre, map.get(pre) + 1)
        } else {
            map.set(pre, 1)
        }
    }

    return count
};