// 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。
//
// 注意： 答案中不可以包含重复的三元组。
//
// 示例：
//
// 给定数组 nums = [-1, 0, 1, 2, -1, -4]，
//
// 满足要求的三元组集合为： [ [-1, 0, 1], [-1, -1, 2] ]

function fn(nums){
    // 从小到大排序
    nums.sort((a,b) => a-b);
    const res = [];
    for(let i=0; i < nums.length - 2; i++){
        // 如果第一个数大于0，与后面的数就不可能等于0了，因为数组是升序
        if(nums[i] > 0) break;
        // 第一个数去重
        if(i > 0 && nums[i] === nums[i - 1]) continue;
        let left = i + 1, right = nums.length - 1;
        while (left < right){
            const sum = nums[i] + nums[left] + nums[right];
            if(sum > 0){
                right --;
            }else if(sum < 0){
                left ++;
            }else{
                res.push([nums[i],nums[left],nums[right]]);
                // 第二个数去重
                while (left < right && nums[left] === nums[left + 1]){
                    left ++;
                }
                // 第三个数去重
                while (left < right && nums[right] === nums[right - 1]){
                    right --;
                }
                // 往中间收缩
                left ++;
                right --;
            }
        }
    }

    return res;
}

console.log(fn( [-1, 0, 1, 2, -1, -4]))
