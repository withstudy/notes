// 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。

// 请注意 ，必须在不复制数组的情况下原地对数组进行操作。

 

// 示例 1:

// 输入: nums = [0, 1, 0, 3, 12]
// 输出: [1, 3, 12, 0, 0]
// 示例 2:

// 输入: nums = [0]
// 输出: [0]
var moveZeroes = function (nums) {
    // 记录0的下标
    let zeroeIndex = -1;
    // 遍历
    for (let i = 0;i < nums.length;i++) {
        // 找到第一个0
        if (nums[i] === 0 && zeroeIndex < 0) {
            zeroeIndex = i
        }
        // 遇到非0，并且之前存在0，交换位置
        if (nums[i] !== 0 && zeroeIndex >= 0) {
            [nums[zeroeIndex], nums[i]] = [nums[i], nums[zeroeIndex]]
            // 更新0的下标
            zeroeIndex++
        }
    }
    return nums
};