// 给定一个字符串，逐个翻转字符串中的每个单词。
//
// 示例 1：
// 输入: "the sky is blue"
// 输出: "blue is sky the"
//
// 示例 2：
// 输入: "  hello world!  "
// 输出: "world! hello"
// 解释: 输入字符串可以在前面或者后面包含多余的空格，但是反转后的字符不能包括。
//
// 示例 3：
// 输入: "a good   example"
// 输出: "example good a"
// 解释: 如果两个单词间有多余的空格，将反转后单词间的空格减少到只含一个。

function fn(s){
    const arr = Array.from(s);
    // 删除多余空格
    removeSpaces(arr);
    // 整体翻转
    reverse(arr,-1,arr.length);

    // 翻转单个单词
    let l = -1;
    for(let i=0;i<=arr.length;i++){
        if(arr[i] === ' ' || i === arr.length){
            reverse(arr,l,i)
            l = i;
        }
    }

    return arr.join('');
}

function removeSpaces(arr){
    let l=0,r=0;
    while (r < arr.length){
        // 删除头部或单词之间多余空格
        // r===0 第一个为空格   arr[r - 1] === ' '：如果前一个不为空格，跳过，因为单词之间需要保留一个空格
        if(arr[r] === ' ' && (r === 0 || arr[r - 1] === ' ')){
            r ++;
        }else{
            arr[l++] = arr[r++];
        }
    }
    // 删除末尾多余空格
    arr.length = arr[l - 1] === ' ' ? l - 1 : l;
}

function reverse(arr,start,end){
    while (++start < --end){
        [arr[start],arr[end]] = [arr[end],arr[start]];
    }
}


// console.log(fn("a good   example"))
console.log(fn("  hello world!  "))
