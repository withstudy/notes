const getNodes = require('./getNodes')

// 递归
function fn(root){
    if(!root) return 0
    const lh = fn(root.left)
    const rh = fn(root.right)
    return 1 + Math.max(lh, rh);
}
// 迭代
function fn1(root){
    if(!root) return 0
    let res = 0;
    const nodes = [root]

    while (nodes.length){
        let len = nodes.length
        res ++;
        while (len--){
            const node = nodes.shift()
            node.left && nodes.push(node.left)
            node.right && nodes.push(node.right)
        }
    }
    return res
}

const root = getNodes(4)
console.log(JSON.stringify(root,null,'\t'))
console.log(fn(root))
console.log(fn1(root))
