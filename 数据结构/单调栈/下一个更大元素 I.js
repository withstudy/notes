// 给你两个 没有重复元素 的数组 nums1 和 nums2 ，其中nums1 是 nums2 的子集。

// 请你找出 nums1 中每个元素在 nums2 中的下一个比其大的值。

// nums1 中数字 x 的下一个更大元素是指 x 在 nums2 中对应位置的右边的第一个比 x 大的元素。如果不存在，对应位置输出 -1 。

// 示例 1:

// 输入: nums1 = [4,1,2], nums2 = [1,3,4,2].
// 输出: [-1,3,-1]

// 示例 2:
// 输入: nums1 = [2,4], nums2 = [1,2,3,4].
// 输出: [3,-1]

function fn(nums1, nums2){
    // map 存储nums[i]对应的第一个更大元素, stack 存储遍历过的下标
    const map = new Map(), stack = []
    for(let i = 0; i < nums2.length; i ++){
        // 如果当前元素大于栈定元素,那么该元素就是栈顶元素的第一个最大元素
        while(stack.length && nums2[i] > nums2[stack[stack.length - 1]]){
            // 保存栈顶元素对应的第一个最大元素
            map.set(nums2[stack.pop()], nums2[i])
        }
        // 记录遍历下表, 表示还没有找到第一个最大元素
        stack.push(i)
    }

    let res = new Array(nums1.length)
    for(let i = 0; i < nums1.length; i ++){
        res[i] = map.get(nums1[i]) || -1
    }

    return res
}

console.log(fn([4,1,2],[1,3,4,2]))
console.log(fn([2,4],[1,2,3,4]))