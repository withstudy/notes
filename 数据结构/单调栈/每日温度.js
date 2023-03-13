// 请根据每日 气温 列表，重新生成一个列表。对应位置的输出为：要想观测到更高的气温，至少需要等待的天数。如果气温在这之后都不会升高，请在该位置用 0 来代替。

// 例如，给定一个列表 temperatures = [73, 74, 75, 71, 69, 72, 76, 73]，你的输出应该是 [1, 1, 4, 2, 1, 1, 0, 0]。

function fn(t){
    // st 记录遍历过的元素
    const len = t.length, res = new Array(len).fill(0), st = []
    for(let i = 0; i < len; i ++){
        // 如果不是递增元素，计算返回值
        while(st.length && t[i] > t[st[st.length - 1]]){
            const n = st.pop()
            // 计算第一个比当天温度高需要等待的天数
            res[n] = i - n
        }    
        
        st.push(i)
    }
    return res
}

console.log(fn([73, 74, 75, 71, 69, 72, 76, 73]))