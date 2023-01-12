const getNodes = require('./getNodes')

function fn(root) {
    function getSum(node, isLeft = false){
        if(!node) return 0
        if(!node.left && !node.right && isLeft) return node.value
        const lSum = getSum(node.left,true)
        const rSum = getSum(node.right)
        return lSum + rSum
    }
    return getSum(root)
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
        right: {
            value:6,
            left: {value:22,left:null,right:null},
            right:null
        }
    }
}
console.log(JSON.stringify(root,null,'\t'))
console.log(fn(root))
