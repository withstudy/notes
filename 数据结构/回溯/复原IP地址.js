// 给定一个只包含数字的字符串，复原它并返回所有可能的 IP 地址格式。

// 有效的 IP 地址 正好由四个整数（每个整数位于 0 到 255 之间组成，且不能含有前导 0），整数之间用 '.' 分隔。

// 例如："0.1.2.201" 和 "192.168.1.1" 是 有效的 IP 地址，但是 "0.011.255.245"、"192.168.1.312" 和 "192.168@1.1" 是 无效的 IP 地址。

// 示例 1：

// 输入：s = "25525511135"
// 输出：["255.255.11.135","255.255.111.35"]
// 示例 2：

// 输入：s = "0000"
// 输出：["0.0.0.0"]
// 示例 3：

// 输入：s = "1111"
// 输出：["1.1.1.1"]
// 示例 4：

// 输入：s = "010010"
// 输出：["0.10.0.10","0.100.1.0"]
// 示例 5：

// 输入：s = "101023"
// 输出：["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"]

function fn(s){
    const len = s.length, path = [], res = []
    recall(0,0)
    function recall(si, ps){
        if(ps === 3){
            // 最后一部分需要单独校验
            if(isValid(s.slice(si))){
                res.push([...path,s.slice(si)].join('.'))
            }
            return 
        }
        for(let i = si; i < len; i ++){
            const t = s.slice(si, i + 1)
            const is = isValid(t)
            if(!is) return
            path.push(t)
            recall(i + 1, ps + 1)
            path.pop()
        }
    }

    return res
}
// s: string
function isValid(s){
    return s.length && (!s.startsWith('0') || s.length === 1 && s === '0') && Number(s) >= 0 && Number(s) <= 255
}

console.log(fn("25525511135"))
console.log(fn("0000"))
console.log(fn("1111"))
console.log(fn("010010"))
console.log(fn("101023"))