// 题意：给定一个包含 n 个整数的数组 nums 和一个目标值 target，
// 判断 nums 中是否存在四个元素 a，b，c 和 d ，使得 a + b + c + d 的值与 target 相等？找出所有满足条件且不重复的四元组。
//
// 注意：
//
// 答案中不可以包含重复的四元组。
//
// 示例： 给定数组 nums = [1, 0, -1, 0, -2, 2]，和 target = 0。
// 满足要求的四元组集合为： [ [-1, 0, 0, 1], [-2, -1, 1, 2], [-2, 0, 0, 2] ]

function fn(nums,target){
    const res = [];
    const len = nums.length;
    if(len < 4) return res;
    // 排序数组
    nums.sort((a,b) => a-b);
    for(let i=0;i<len-3;i++){
        // 剪枝
        if(target > 0 && nums[i] > 0 && nums[i] > target) break;
        // 去重第一个数
        if(i>0 && nums[i] === nums[i-1]) continue;
        for(let j=i+1;j<len-2;j++){
            // 去重第二个数
            if(j>0 && nums[j] === nums[j-1]) continue;
            let left = j + 1,right = len - 1;
            while (left < right){
                const sum = nums[i] + nums[j] + nums[left] + nums[right];
                if(sum > target) {
                    right --;
                } else if(sum < target){
                    left ++;
                }else{
                    res.push([nums[i],nums[j],nums[left],nums[right]]);
                    while (left < right && nums[left] === nums[++left]);
                    while (left < right && nums[right] === nums[--right]);
                    // // 去重第三个数
                    // while (left < right && nums[left] === nums[left + 1]){
                    //     left ++;
                    // }
                    // // 去重第四个数
                    // while (left < right && nums[right] === nums[right - 1]){
                    //     right --;
                    // }
                    // left ++;
                    // right --;
                }
            }
        }
    }
    return res;
}

console.log(fn([1, 0, -1, 0, -2, 2],0))
// console.log(fn([2,1,4,5],0))
