// 给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的字母异位词。
//
// 示例 1: 输入: s = "anagram", t = "nagaram" 输出: true
//
// 示例 2: 输入: s = "rat", t = "car" 输出: false
function fn(s,t){
    const arr = new Array(26).fill(0);
    const a = "a".charCodeAt()
    for(var i=0;i<s.length;i++){
        arr[s[i].charCodeAt() - a] ++;
    }
    for(var i=0;i<t.length;i++){
        arr[s[i].charCodeAt() - a] --;
    }
    for(var i=0;i<arr.length;i++){
        if(arr[i] !== 0) return false
    }

    return true;
}

console.log(fn('abcc','bac'))
