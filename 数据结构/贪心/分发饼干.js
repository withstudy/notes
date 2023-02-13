// 用有限的饼干cookies满足尽可能多的孩子childred
function fn(children,cookies) {
    children.sort()
    cookies.sort()
    let res = 0
    let len = children.length,i=len-1,j=cookies.length-1
    while (i>=0){
        if(children[i] < cookies[j]){
            i--;
            j--;
            res ++;
        }else{
            i--;
        }
    }
    return res
}
const children = [1,5,3,9],cookies = [2,5,7]
console.log(fn(children,cookies))
