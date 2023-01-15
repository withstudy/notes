function fn(root,target) {
    if(!root || root.value === target)return root
    return target > root.value ? fn(root.right,target) : fn(root.left,target)
}

function fn1(root,target){
    while (root){
        if(root.value === target){
            return root
        }
        if(root.value > target){
            root = root.left
        }else{
            root = root.right
        }
    }
    return root
}

const root = {
    value:4,
    left: {value:2,left:{value:1,left:null,right:null},right:{value:3,left:null,right:null}},
    right: {value:7,left:null,right:{value:8,left:null,right:{value:9,left:null,right:null}}}
}
console.log(fn(root,7))
console.log(fn1(root,7))
