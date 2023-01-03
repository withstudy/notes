// 给你一个数组 nums 和一个值 val，你需要 原地 移除所有数值等于 val 的元素，并返回移除后数组的新长度。

function delItem(nums, val) {
    let slow = 0;
    for(let i=0;i<nums.length;i++){
        if(nums[i] !== val){
            nums[slow] = nums[i];
            slow ++;
        }
    }
    return slow;
}


console.log(delItem([1,4,3,4,4],4))
