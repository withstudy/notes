function fn(root1,root2){
    if(!root1 && !root2) return null
    if(!root2) return root1
    if(!root1) return root2
    root1.value = root1.value + root2.value
    root1.left = fn(root1.left,root2.left)
    root1.right = fn(root1.right,root2.right)
    return root1
}

const root1 = {
    value: 1,
    left: {value:2,left:null,right:null},
    right:{value:3,left:{value:4,left:null,right:null},right:null}
}

const root2 = {
    value: 1,
    left: {value:2,left:null,right:{value:4,left:null,right:null}},
    right:{value:3,left:null,right:null}
}

console.log(fn(root1,root2))
