const getNodes = require('./getNodes')

function fn(root) {
    const res = []
    if(!root) return res
    const nodes = [root]
    while (nodes.length){
        const node = nodes.pop()
        if(!node){
            res.push(nodes.pop().value)
            continue
        }
        // 前序- 中左右
        node.right && nodes.push(node.right) // 右
        node.left && nodes.push(node.left) // 左
        nodes.push(node) // 中
        nodes.push(null) // 标记
    }

    return res
}

const root = getNodes(4)
console.log(JSON.stringify(root,null,'\t'))
console.log(fn(root))
