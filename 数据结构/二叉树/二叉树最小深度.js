const getNodes = require('./getNodes')

// 递归
function fn(root){
    if(!root) return 0
    if(!root.left && !root.right) return 1
    if(!root.left) return 1 + fn(root.right)
    if(!root.right) return 1 + fn(root.left)
    return 1 + Math.min(fn(root.left), fn(root.right));
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
            if(!node.left && !node.right) return res
            node.left && nodes.push(node.left)
            node.right && nodes.push(node.right)
        }
    }
}

const root = {
    value:1,
    left: {
        value:2,
        left: {
            value:3,
            left:null,
            right:null
        },
        right: {
            value:4,
            left:null,
            right:null
        }
    },
    right: {
        value:2,
        left: null,
        right: null
    }
}
console.log(JSON.stringify(root,null,'\t'))
console.log(fn(root))
console.log(fn1(root))
