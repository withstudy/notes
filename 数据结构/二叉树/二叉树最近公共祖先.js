function fn(root,q,p) {
    // 处理空节点或者根节点就是q或者p的情况
    if(!root || root === q || root === p) return root
    const left = fn(root.left,q,p)
    const right = fn(root.right,q,p)
    if(left && right) return root
    if(right) return right
    return left
}

const q = {
    value: 11,
    left: null,
    right: null
}

const p = {
    value: 15,
    left: null,
    right: null
}

const root = {
    value:1,
    left: {
        value: 10,
        left:q,
        right: p
    },
    right:{
        value: 5,
        left: null,
        right: null
    }
}

console.log(fn(root,q,p))
