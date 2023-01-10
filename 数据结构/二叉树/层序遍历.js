const getNodes = require('./getNodes')

function fn(root) {
    const res = []
    if(!root)return res
    const arr = []
    // 推入第一层
    arr.push(root)
    while (arr.length){
        // 记录当前层的元素
        const nodes = []
        // 记录当层的元素个数
        let len = arr.length
        while (len--){
            const node = arr.shift();
            nodes.push(node.value)
            // 记录下一层 的元素
            node.left && arr.push(node.left)
            node.right && arr.push(node.right)
        }
        // 保存当前层
        res.push(nodes)
    }
    return res
}

const root = getNodes(4)
console.log(JSON.stringify(root,null,'\t'))
console.log(fn(root))
