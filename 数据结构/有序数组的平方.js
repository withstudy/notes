// 给你一个按 非递减顺序 排序的整数数组 nums，返回 每个数字的平方 组成的新数组，要求也按 非递减顺序 排序。

// 示例 1： 输入：nums = [-4,-1,0,3,10] 输出：[0,1,9,16,100]
//         解释：平方后，数组变为 [16,1,0,9,100]，排序后，数组变为 [0,1,9,16,100]

function sort(nums){
    const res = [];
    let len = nums.length-1;
    for(let i=0,j=len;i<=j;){
        // 升序的数组 平方之后的值，两边的才有可能是最大的，所以从两边才是遍历
        const left = Math.pow(nums[i],2);
        const right = Math.pow(nums[j],2);
        if(left >= right){
            res[len] = left;
            i++;
        }else{
            res[len] = right;
            j--;
        }

        len --;
    }
    return res;
}

console.log(sort([1,2,3,6]))
