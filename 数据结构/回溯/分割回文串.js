// 给定一个字符串 s，将 s 分割成一些子串，使每个子串都是回文串。

// 返回 s 所有可能的分割方案。

// 示例: 输入: "aab" 输出: [ ["aa","b"], ["a","a","b"] ]

function fn(s){
    const len  = s.length, path = [], res = []

    recall(0)
    return res
    function recall(si){
        if(si >= len){
            res.push([...path])
            return 
        }
        for(let i = si; i < len ; i ++){
            if(!isPlinedrome(s.slice(si, i + 1))) continue
            path.push(s.slice(si, i + 1))
            recall(i + 1)
            path.pop()
        }
    }
}
    function isPlinedrome(s){
        let l = -1, r = s.length
        while(++l < --r){
            if(s[l] !== s[r]){
                return false
            }
        }
        return true
    }


console.log(fn("aab"));