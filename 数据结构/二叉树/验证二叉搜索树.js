function fn(root){
    let max = null
    function getRes(node){
        if(!node)return true
        // 先左，一直遍历到左叶子节点，max就等于左叶子节点，也就是二叉搜索树中最小的一个数
        // 如果返回之后，有比max小的，说明不是二叉搜索树
        const l = getRes(node.left)
        if(max && node.value <= max.value) return false
        max = node
        const r = getRes(node.right)
        return l && r
    }
    return getRes(root)
}

const root = {
    value:4,
    left: {value:2,left:{value:1,left:null,right:null},right:{value:3,left:null,right:null}},
    right: {value:7,left:null,right:{value:8,left:null,right:{value:9,left:null,right:null}}}
}
console.log(fn(root,7))
