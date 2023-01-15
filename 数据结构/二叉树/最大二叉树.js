// 传入一个数组，其中得最大值作为根节点，在最大值左边得作为左子二叉树
function fn(nums){
    if(!nums.length) return null
    if(nums.length === 1)return {value:nums[0],left:null,right:null}
    const max = Math.max(...nums)
    const index = nums.indexOf(max)
    const root = {
        value: max,
        left: fn(nums.slice(0,index)),
        right: fn(nums.slice(index+1))
    }
    return root
}

console.log(fn([3,2,1,6,0,5]))
