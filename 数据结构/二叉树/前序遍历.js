const getNodes = require('./getNodes')

function fn(root) {
    const res = []
    const dfs = node => {
        if(!node) return
        res.push(node.value)
        dfs(node.left)
        dfs(node.right)
    }
    dfs(root)
    return res
}

function fn1(root){
    const res = []
    const arr = [root]
    while (arr.length){
        const node = arr.pop();
        res.push(node.value)
        node.right && arr.push(node.right)
        node.left && arr.push(node.left)
    }
    return res
}

const root = getNodes(4)
console.log(JSON.stringify(root,null,'\t'))
console.log(fn(root))
console.log(fn1(root))

