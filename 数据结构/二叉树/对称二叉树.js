const getNodes = require('./getNodes')

function fn(root) {
    if(!root) return true
    function compare(left,right) {
        if(!left && right || !right && left) return false
        if(!left && !right) return true
        if(left.value !== right.value) return false
        return compare(left.left,right.right) && compare(left.right,right.left)
    }
    return compare(root.left,root.right)
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
                value:4,
                left:null,
                right:null
            },
            right: {
                value:3,
                left:null,
                right:null
            }
        }
}
console.log(JSON.stringify(root,null,'\t'))
console.log(fn(root))
