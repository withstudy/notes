function fn(n) {
    let pre = 1, cur = 1
    for(let i = 2; i <= n; i ++){
        const next = pre + cur
        pre = cur
        cur = next
    }
    return cur
}

console.log(fn(3))
console.log(fn(5))
