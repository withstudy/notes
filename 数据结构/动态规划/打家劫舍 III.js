// 在上次打劫完一条街道之后和一圈房屋后，小偷又发现了一个新的可行窃的地区。这个地区只有一个入口，
// 我们称之为“根”。 除了“根”之外，每栋房子有且只有一个“父“房子与之相连。一番侦察之后，聪明的小偷意识到“这个地方的所有房屋的排列类似于一棵二叉树”。
// 如果两个直接相连的房子在同一天晚上被打劫，房屋将自动报警。
//
// 计算在不触动警报的情况下，小偷一晚能够盗取的最高金额。
// 例子1：
//         3
//     /       \
//    2         3
//     \          \
//      3          1
// 输出：7
function fn(root) {
    // 返回一个数组dp，dp[0] 代表不取当前数值得到的最大价值，dp[1] 代表取当前数值得到的最大数值
    if(!root) return new Array(2).fill(0)

    const letfdp = fn(root.left)
    const rightdp = fn(root.left)

    // 取，就不能取两个子节点
    const val = root.value + letfdp[0] + rightdp[0]
    // 不取，就可以取两个子节点的最大价值
    const val1 = Math.max(...letfdp) + Math.max(...rightdp)

    return [val,val1]
}

function fnn(root){
    return Math.max(...fn(root))
}

const root = {
    value: 3,
    left: {value: 2, left: null, right: {value: 3, left: null, right: null}},
    right: {value: 3, left: null, right: {value: 1, left: null, right: null}}
}

console.log(fnn(root))
