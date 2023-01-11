const getNodes = require('./getNodes')

// 递归
function fn(root) {
    function getHeight(node){
        if(!node) return 0
        const lh = getHeight(node.left)
        if(lh === -1) return lh
        const rh = getHeight(node.right)
        if(rh === -1) return rh
        let res
        if(Math.abs(lh - rh) > 1){
            res = -1
        }else{
            res = Math.max(lh, rh) + 1
        }
        return res
    }
    return getHeight(root) !== -1
}

// const root = getNodes(4)
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
