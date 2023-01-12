const getNodes = require('./getNodes')

function fn(root) {
    const res = []
    if(!root) return res
    function getPath(node, path = []){
        path.push(node.value)
        // 叶子节点保存路径
        if(!node.left && !node.right){
            res.push([...path])
            return
        }
        if(node.left){
            getPath(node.left,path)
            path.pop()
        }
        if(node.right){
            getPath(node.right,path)
            path.pop()
        }
    }
    getPath(root)
    return res
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
        left: {
            value:5,
            left:null,
            right:null
        },
        right: {
            value:6,
            left:null,
            right:null
        }
    }
}
console.log(JSON.stringify(root,null,'\t'))
console.log(fn(root))
