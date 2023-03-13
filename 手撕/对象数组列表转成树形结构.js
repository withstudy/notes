function fn(s){
    const temp = {}
    const tree = []
    //先转换为对象,方便使用
    for(let i = 0; i < s.length; i ++){
        temp[s[i].id] = s[i]
    }
    // 遍历对象
    for(let t in temp){
        if(temp[t].parentId === 0){
            // 如果没有父节点,添加到tree种
            tree.push(temp[t])
        } else {
            // 如果有父节点,添加到对应的父节点的children种
            if(!temp[temp[t].parentId].children){
                temp[temp[t].parentId].children = []
            }
            temp[temp[t].parentId].children.push(temp[t])
        }
        // 删除parentId属性
        delete temp[t].parentId
    }
    return tree
}

const data = [
    {
        id: 1,
        text: '节点1',
        parentId: 0
    },
    {
        id: 2,
        text: '节点2',
        parentId: 1
    },
    {
        id: 3,
        text: '节点3',
        parentId: 0
    },
    {
        id: 4,
        text: '节点4',
        parentId: 2
    },
     {
        id: 5,
        text: '节点5',
        parentId: 2
    },
]

console.dir(fn(data),{depth:5})