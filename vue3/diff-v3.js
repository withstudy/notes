// const oldVnodes = [1,2,3,4,5,6,7]
// const newVnodes = [1,2,6,4,5,8,7]
const oldVnodes = [1, 2, 7]
const newVnodes = [1, 2, 3, 4, 7]

function diff(newVnodes, oldVnodes) {
    let i = 0;
    let e1 = newVnodes.length -1; // 例子：6
    let e2 = oldVnodes.length - 1; // 例子：6

    // 前预处理
    while(newVnodes[i] === oldVnodes[i]){
        console.log('前预处理', newVnodes[i])
        i ++;
    }
    // 例子：i= 2
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
        const toBePatched = e2 - i + 1 

        // 新vnode 与 index map
        const newToIndexMap = new Map() 
        for(i = s1; i <= e1; i++) {
            newToIndexMap.set(newVnodes[i], i)
        }
        console.log('newToIndexMap', newToIndexMap)

        // 老节点再新节点中的index map
        const oldToNewIndexMap = new Array(toBePatched).fill(0)
        let maxNewIndexSoFar = 0
        let moved = false
        // 例子： i=2 i<=5
        for(i = s2; i <= e2; i ++) {
            const oldVnode = oldVnodes[i]
            const newIndex = newToIndexMap.get(oldVnode)
            if (newIndex) {
                oldToNewIndexMap[newIndex - s1] = i + 1
                if (newIndex > maxNewIndexSoFar) {
                    maxNewIndexSoFar = newIndex
                } else {
                    moved = true
                }
            }else {
                console.log('unmount', oldVnode)
            }
        }
        console.log('oldToNewIndexMap', oldToNewIndexMap)

        const increasingNewIndexSequence = moved ? getSequence(oldToNewIndexMap) : []
        console.log('increasingNewIndexSequence', increasingNewIndexSequence)
        let j = increasingNewIndexSequence.length - 1
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
    let arr = [0]
    for (let i = 1;i < len;i++) {
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