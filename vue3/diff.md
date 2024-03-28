# vue2 diff 简易代码实现

```js
const oldVNodes = [1,2,3,4]
const newVNodes = [3,2,5]

function diff(oldVNodes, newVNodes) {
    let oldStartIndex = 0
    let oldEndIndex = oldVNodes.length - 1
    let newStartIndex = 0
    let newEndIndex = newVNodes.length - 1

    let oldStartVnode = oldVNodes[0]
    let oldEndVnode = oldVNodes[oldEndIndex]
    let newStartVnode = newVNodes[0]
    let newEndVnode = newVNodes[newEndIndex]

    while(oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex){

        if(!oldStartVnode){
            oldStartVnode = oldVNodes[++oldStartIndex]
        }else if(!oldEndVnode){
            oldEndVnode = oldVNodes[--oldEndIndex]
        }else if(oldStartVnode === newStartVnode){
            // 头头比较
            oldStartVnode = oldVNodes[++oldStartIndex]
            newStartVnode = newVNodes[++newStartIndex]
        }else if(oldEndVnode === newEndVnode){
            // 尾尾比较
            oldEndVnode = oldVNodes[--oldEndIndex]
            newEndVnode = newVNodes[--newEndIndex]
        }else if(oldStartVnode === newEndVnode){
            // 头尾比较
            oldStartVnode = oldVNodes[++oldStartIndex]
            newEndVnode = newVNodes[--newEndIndex]
        }else if(oldEndVnode === newStartVnode){
            // 尾头比较
            oldEndVnode = oldVNodes[--oldEndIndex]
            newStartVnode = newVNodes[++newStartIndex]
        }else {
            // 老节点不存在新节点中了
            const map = new Map()
            // 记录节点位置
            for(let i = oldStartIndex; i <= oldEndIndex; i++){
                map.set(oldVNodes[i], i)
            }

            // 查找新节点是否在老节点中
            const indexInOld = map.get(newStartVnode)
            if(indexInOld === undefined) {
                // 新节点
                console.log('新节点', newStartVnode, newStartIndex)
            } else {
                // 移动节点
                // 赋值undefined防止被删除
                oldVNodes[indexInOld] = undefined
                console.log('移动节点', newStartIndex, '<-' ,indexInOld)
            }
            newStartVnode = newVNodes[++newStartIndex]
        }
        // 老节点遍历完毕，新节点中剩下的都是新添加的
        if(oldStartIndex > oldEndIndex){
            // 添加新节点
        }else if(newStartIndex > newEndIndex){  // 新节点遍历完毕，老节点剩下都是要删除的
            // 删除老节点
            for(let i = 0; i < oldVNodes.length; i++){
                if(oldVNodes[i] !== undefined){
                    console.log('删除节点', oldVNodes[i])
                }
            }
        }
    }
}

diff(oldVNodes, newVNodes)
// 移动节点 0 <- 2
// 移动节点 1 <- 1
// 新节点 5 2
// 删除节点 1
// 删除节点 4
```