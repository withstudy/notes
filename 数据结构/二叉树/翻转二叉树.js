const getNodes = require('./getNodes')
// 递归
function fn(root) {
    if(!root) return root
    const node = root.right
    root.right = fn(root.left)
    root.left = fn(node)
    return root
}
// 层序
function fn1(root){
    if(!root) return root
    const nodes = [root]
    while (nodes.length){
        let len = nodes.length
        while (len --){
            let node  = nodes.shift()
            // 翻转
            let s = node.left
            node.left = node.right
            node.right = s
            // 使用的队列，先进先出
            node.left && nodes.push(node.left)
            node.right && nodes.push(node.right)
        }
    }
    return root
}
// 前序
function fn2(root){
    if(!root) return
    const nodes = [root]
    while (nodes.length){
        const node = nodes.pop()
        let s = node.left
        node.left = node.right
        node.right = s
        // 使用的栈，先进后出
        node.right && nodes.push(node.right)
        node.left && nodes.push(node.left)
    }
    return root
}

const root = getNodes(4)
console.log(JSON.stringify(root,null,'\t'))
// console.log(fn(root))
// console.log(fn1(root))
console.log(fn2(root))
