// 判断链表是否为环形链表，并返回入环的第一个节点
// 思路：首先通过快慢指针判断是否为环形链表，快慢指针指向同一个节点的时候，
// 将满指针指向根节点，然后快慢指针每次都移动一步，等快慢指针再次相等，这个节点就是入环的第一个节点

function fn(root){
    if(!root)return null
    let slow = root,fast = root,is = false
    while (slow.next && fast.next.next){
        slow = slow.next
        fast = fast.next.next
        if(slow === fast) {
            is = true
            break
        }
    }
    if(is){
        slow = root
        while (slow !== fast){
            slow = slow.next
            fast = fast.next
        }
        return slow
    }
    return null
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
