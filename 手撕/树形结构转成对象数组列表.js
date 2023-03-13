function fn(tree, parentId = 0){
    const res = []
    for(let i = 0; i < tree.length; i ++){
        // 保存children 删除对象上的children属性
        const children = tree[i].children
        delete tree[i].children
        tree[i].parentId = parentId
        // 如果存在children 递归
        if(children && children.length){
            res.push(...fn(children,tree[i].id))
        }
        res.push(tree[i])
    }

    return res
}

const data = [
  {
    id: 1,
    text: '节点1',
    children: [
      {
        id: 2,
        text: '节点2',
        children: [ { id: 4, text: '节点4' }, { id: 5, text: '节点5' } ]
      }
    ]
  },
  { id: 3, text: '节点3' }
]

console.log(fn(data))