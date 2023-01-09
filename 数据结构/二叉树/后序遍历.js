const getNodes = require('./getNodes')

// 递归
function fn(root) {
    const res = []
    const dfs = node => {
        if(!node) return
        dfs(node.left)
        dfs(node.right)
        res.push(node.value)
    }
    dfs(root)
    return res
}

function fn1(root){
    const arr = [root]
    const res = []
    while (arr.length){
        const node = arr.pop();
        res.push(node.value)
        node.left && arr.push(node.left)
        node.right && arr.push(node.right)
    }
    return res.reverse()
}

const root = getNodes(4)
console.log(JSON.stringify(root,null,'\t'))
console.log(fn(root))
console.log(fn1(root))
