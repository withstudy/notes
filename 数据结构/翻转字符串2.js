// 给定一个字符串 s 和一个整数 k，从字符串开头算起, 每计数至 2k 个字符，就反转这 2k 个字符中的前 k 个字符。
//
// 如果剩余字符少于 k 个，则将剩余字符全部反转。
//
// 如果剩余字符小于 2k 但大于或等于 k 个，则反转前 k 个字符，其余字符保持原样。
//
// 示例:
//
//     输入: s = "abcdefg", k = 2
// 输出: "bacdfeg"

function fn(s,k) {
    const arr = s.split("");
    const len = arr.length;
    for(let i=0;i<len;i+=2*k){
        // i+k > len: 说明剩余字符少于k，所以翻转i~len的字符
        // i+k < len: 说明剩余字符大于k，所以翻转i~i+k的字符
        let l=i-1,r=i+k > len ? len : i+k;
        // 翻转
        while (++l < --r){
            [arr[l],arr[r]] = [arr[r],arr[l]];
        }
    }
    return arr.join("");
}

console.log(fn("abcdefg",2))
