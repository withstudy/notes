const getNodes = require('./getNodes')

// 递归
function fn(root) {
    if(!root) return 0
    const l = fn(root.left)
    const r = fn(root.right)
    return l + r + 1
}

// 利用完全二叉树特性
function fn1(root) {
    if(!root) return 0
    let left = root.left,right = root.right
    let lh = 0,rh = 0
    // 统计左子树和右子树的深度
    while (left){
        left = left.left
        lh ++
    }
    while (right) {
        right = right.right
        rh ++
    }
    // 如果左右子树深度相等，那么就是完全二叉树
    // 2^n-1: 完全二叉树节点计算公式
    if(lh === rh)return Math.pow(2,lh + 1) - 1
    // 不是完全二叉树，继续遍历左右子树
    let ln = fn1(root.left)
    let rn = fn1(root.right)
    return ln + rn + 1
}

const root = getNodes(4)
console.log(JSON.stringify(root,null,'\t'))
console.log(fn(root))
console.log(fn1(root))
