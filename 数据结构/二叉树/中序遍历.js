const getNodes = require('./getNodes')

function fn(root) {
    const res = []
    const dfs = node => {
        if(!node) return
        dfs(node.left)
        res.push(node.value)
        dfs(node.right)
    }
    dfs(root)
    return res
}

function fn1(root) {
    const res = []
    const arr = []
    let cur = root
    while (arr.length || cur){
        if(cur){
            arr.push(cur)
            cur = cur.left
        }else{
            cur = arr.pop()
            res.push(cur.value)
            cur = cur.right
        }
    }
    return res
}

const root = getNodes(4)
console.log(JSON.stringify(root,null,'\t'))
console.log(fn(root))
console.log(fn1(root))
