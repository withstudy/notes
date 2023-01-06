// 给定一个非空的字符串，判断它是否可以由它的一个子串重复多次构成。给定的字符串只含有小写英文字母，并且长度不超过10000。
//
// 示例 1:
// 输入: "abab"
// 输出: True
// 解释: 可由子字符串 "ab" 重复两次构成。
//
// 示例 2:
// 输入: "aba"
// 输出: False
//
// 示例 3:
// 输入: "abcabcabcabc"
// 输出: True
// 解释: 可由子字符串 "abc" 重复四次构成。 (或者子字符串 "abcabc" 重复两次构成。)

function fn1(s) {
    // 思路:字符串与本身拼接，删除第一个和最后一个，如果还包含该字符串，那么它是否可以由它的一个子串重复多次构成
    let ss = s + s;
    ss = ss.slice(1,ss.length-1);
    return ss.includes(s);
}

// console.log(fn1("abab"));
// console.log(fn1("aba"));
// console.log(fn1("abcabcabcabc"));

function fn2(s){
    // 通过KMP获取前缀表
    const next = getNext(s);
    const len = next.length;
    // 如果前缀表最后一个元素不等于0 和 字符串长度取模字符串长度-最长相同前后缀 等于0 那么它是否可以由它的一个子串重复多次构成
    return next[len-1] !== 0 && s.length % (s.length - next[len - 1]) === 0;
}

function getNext(s){
    let j = 0;
    const next = [0];
    for(let i = 1; i<s.length;i++){
        while (j>0 && s[j] !== s[i]) j = next[j-1];
        if(s[j] === s[i]) j++;
        next[i] = j;
    }
    return next;
}

console.log(fn2("abab"));
console.log(fn2("aba"));
console.log(fn2("abcabcabcabc"));
console.log(fn2("abcabcabcefg"));
