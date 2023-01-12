const getNodes = require('./getNodes')

function fn(root,target) {
    if(!root) return false
    if(!root.left && !root.right && target === root.value)return true
    const l = fn(root.left,target - root.value)
    if(l) return l
    const r = fn(root.right,target - root.value)
    return l || r
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
            left: null,
            right:null
        }
    }
}
console.log(JSON.stringify(root,null,'\t'))
console.log(fn(root,2))
