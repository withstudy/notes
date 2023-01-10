// 判断链表是否为环形链表
// 思想：快慢指针，快指针一次走两步，满指针走一步，如果是环形链表，那么快慢指针终会相遇
function fn(root) {
    if(!root) return false
    let slow = root,fast = root
    while (slow.next !== null && fast.next.next !== null){
        slow = slow.next
        fast = fast.next.next
        if(slow === fast){
            return true
        }
    }
    return false
}

const obj1 = {value:0,next:null}
const obj2 = {value:1,next:null}
const obj3 = {value:2,next:null}
const obj4 = {value:3,next:null}
obj1.next = obj2
obj2.next = obj3
obj3.next = obj4
obj4.next = obj2

console.log(fn(obj1))
console.log(fn(null))
obj4.next = null
console.log(fn(obj1))
