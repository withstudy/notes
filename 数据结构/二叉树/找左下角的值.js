const getNodes = require('./getNodes')

function fn(root) {
    let max = -Infinity,res,d=0
    function get(node){
        if(!node.left && !node.right){
            // 因为遍历顺序是左右中，所以到了最后一层也就是深度最大的时候，会先保存最左节点的值，等再遍历右节点是，最大深度已经改变，也就只保存了最左节点
            if(d > max){
                max = d
                res = node.value
            }
            return
        }
        if(node.left){
            d ++
            get(node.left)
            d --
        }
        if(node.right){
            d ++
            get(node.right)
            d --
        }
    }
    get(root)
    return res
}

// 层序
function fn1(root){
    if(!root) return root
    let arr = [root],res
    while (arr.length){
        let len = arr.length
        res = null
       while (len --){
            const node = arr.shift()
           // 只保存每层的第一个节点，也就是最左节点
            if(!res) res = node.value
           node.left && arr.push(node.left)
           node.right && arr.push(node.right)
       }
    }
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
        left: null,
        right: {
            value:6,
            left: null,
            right:null
        }
    }
}
console.log(JSON.stringify(root,null,'\t'))
console.log(fn(root))
console.log(fn1(root))
