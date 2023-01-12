// 中 + 后
function fn(inorder,postorder){
    if(!postorder.length) return null
    const root = {value:null,left:null,right:null}
     // 从后序遍历中去除根节点值
    root.value = postorder.pop()
    // 找到根节点再中序中得位置
    const midIndex = inorder.indexOf(root.value)
    root.left = fn(inorder.slice(0,midIndex),postorder.slice(0,midIndex))
    // + 1 防止根节点再次传入，而后序遍历不用，因为使用pop取出了根节点值
    root.right = fn(inorder.slice(midIndex + 1),postorder.slice(midIndex))
    return root
}
// 中 + 前
function fn1(inorder,preorder){
    if(!preorder.length) return null
    const root = {value:null,left:null,right:null}
    root.value = preorder.shift()
    const midIndex = inorder.indexOf(root.value)
    root.left = fn1(inorder.slice(0,midIndex),preorder.slice(0,midIndex))
    root.right = fn1(inorder.slice(midIndex + 1),preorder.slice(midIndex))
    return root
}

console.log(fn([9,3,15,20,7],[9,15,7,20,3]))
console.log(fn1([9,3,15,20,7],[3,9,20,15,7]))
