const a = '1234';
const b = 1234; // NaN Infinity
const c = true; // false
const d = null; //非严格模式 基本数据类型可以赋值null
const arr1 = ['1', '2', '3'];
const arr2 = [1, 2, 3];
const arr4 = [1, '3'];
const f = { id: '001' }; // function (){} []
const h = { id: '001', name: 'b', age: 10 };
const o = {};
function fn1(name, age = 10) {
    return `name:${name},age:${age}`;
}
fn1('123', 12);
fn1('123'); // ok
fn1();
const fn2 = function (name, sex = '10') {
    return `name:${name},sex:${sex}`;
};
var Status;
(function (Status) {
    Status[Status["one"] = 0] = "one";
    Status[Status["two"] = 1] = "two";
    Status[Status["three"] = 5] = "three";
    Status[Status["four"] = 6] = "four"; //6
})(Status || (Status = {}));
// const enum StaticStatus {
//     stop='0',
//     start='1',
//     wait='3'
// }
let any1 = 123;
any1 = '123';
any1 = value => value;
let y = 123;
// y = '123' //error
let y1;
y1 = 123; //ok
y1 = '123'; //ok
const nums = [101, 102, 103, '104'];
const res = nums.find(num => typeof num === 'number');
const num1 = res;
// const pow = res * res //error
const pow1 = num1 * num1;
const user = {
    id: '001',
    name: '1'
};
// user.name = '2' //error
function fn3(user) {
    console.log(user);
}
fn3(user);
class Student {
    study(subject) {
        return `学习${subject}`;
    }
}
class Person extends Student {
    constructor(name, age, gender) {
        super();
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
    eat(num) {
        return `${this.name}吃${num}碗饭`;
    }
    sleep(time) {
        return `${this.name}${time}开始睡觉`;
    }
}
const person = new Person('张三', 12, true);
// person.name = '李四' //error
//
// const age = person.age //error
// const gender = person.gender //error
console.log(person.study('语文'));
console.log(person.sleep('11:00'));
