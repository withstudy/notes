const oldVnodes = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
const newVnodes = ['a', 'b', 'd', 'g', 'c', 'f', 'h']
// const oldVnodes = [1, 2, 7]
// const newVnodes = [1, 2, 3, 4, 7]

function diff(newVnodes, oldVnodes) {
    let i = 0;
    let e1 = newVnodes.length -1; 
    let e2 = oldVnodes.length - 1; 

    // 前预处理
    while(newVnodes[i] === oldVnodes[i]){
        console.log('前预处理', newVnodes[i])
        i ++;
    }
    // 后预处理
    while(i <= e1 && i <= e2) {
        if(newVnodes[e1] === oldVnodes[e2]){
            console.log('后预处理', newVnodes[e1])
            e1 --;
            e2 --;
        } else {
            break
        }
    }
    // 例子：e1 = e2 = 5

    if(i > e1) {
        // 新vnode无剩余，删除旧vnode中的剩余节点
        while(i <= e2) {
            console.log('~unmount', oldVnodes[i])
            i ++;
        }
    } else if (i > e2) {
        // 旧vnode无剩余，新增新vnode中的剩余节点
        while(i <= e1) {
            console.log('~mount', newVnodes[i])
            i ++;
        }
    } else {
        let [s1, s2] = [i, i] 

        // 新vnode 与 index map
        const newToIndexMap = new Map() 
        for(i = s1; i <= e1; i++) {
            newToIndexMap.set(newVnodes[i], i)
        }
        console.log('newToIndexMap', newToIndexMap)

        // 需要patch的节点数
        const toBePatched = e1 - s1 + 1 

        // 老节点再新节点中的index map
        const oldToNewIndexMap = new Array(toBePatched).fill(0)
        // 不需要移动的最远节点index
        let maxNewIndexSoFar = 0
        // 是否需要移动
        let moved = false
        // 遍历剩余的旧节点
        for(i = s2; i <= e2 ; i ++) {
            // 取出旧节点
            const oldVnode = oldVnodes[i]
            // 是否存在新节点中
            const newIndex = newToIndexMap.get(oldVnode)
            if (newIndex !== undefined) {
                // 保存节点在旧节点中的位置， 会向后偏移 1
                // console.log(oldVnode, newIndex, newIndex - s1, i +1)
                oldToNewIndexMap[newIndex - s1] = i + 1
                // 判断新旧节点是否一样的顺序
                if (newIndex > maxNewIndexSoFar) {
                    maxNewIndexSoFar = newIndex
                } else {
                    // 不一样顺序，标记要移动
                    moved = true
                }
                // patch
                console.log("patch", oldVnodes[i])
            }else {
                // 不存在新节点中，直接删除
                console.log('unmount', oldVnode)
            }
        }
        console.log('oldToNewIndexMap', oldToNewIndexMap)
        // 获取最长递增子序列的下标
        const increasingNewIndexSequence = moved ? getSequence(oldToNewIndexMap) : []
        console.log('increasingNewIndexSequence', increasingNewIndexSequence)
        // 从后遍历增子序列的下标
        let j = increasingNewIndexSequence.length - 1
        // 后遍历新节点在老节点中的位置
        for(i = toBePatched - 1; i >= 0; i --) {
            if(oldToNewIndexMap[i] === 0) {
                console.log('mounted', newVnodes[s1 + i])
            } else if(moved) {
                if (j < 0 || i !== increasingNewIndexSequence[j]){
                    // move
                    console.log("move", newVnodes[s1 + i])
                } else {
                    j --
                }
            }
        }
    }
}
// 获取最长递增子序列
function getSequence(nums) {
    const len = nums.length
    let res = []
    let i = 0
    while(i < len) {
        if(nums[i] === 0){
            i++
        } else {
            break
        }
    }
    if(i >= len) return res
    let arr = []
    for (i = i + 1;i < len;i++) {
        if(nums[i] === 0) {
            arr = []
            continue
        }
        if (nums[i] > nums[i - 1]) {
            arr.push(i)
        } else {
            arr = [i]
        }
        res = arr.length > res.length ? arr : res
    }
    return res
}

diff(newVnodes, oldVnodes)
