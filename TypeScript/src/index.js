var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var a = '1234';
var b = 1234; // NaN Infinity
var c = true; // false
var d = null; //非严格模式 基本数据类型可以赋值null
var arr1 = ['1', '2', '3'];
var arr2 = [1, 2, 3];
var arr4 = [1, '3'];
var f = { id: '001' }; // function (){} []
var h = { id: '001', name: 'b', age: 10 };
var o = {};
function fn1(name, age) {
    if (age === void 0) { age = 10; }
    return "name:".concat(name, ",age:").concat(age);
}
fn1('123', 12);
fn1('123'); // ok
fn1();
var fn2 = function (name, sex) {
    if (sex === void 0) { sex = '10'; }
    return "name:".concat(name, ",sex:").concat(sex);
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
var any1 = 123;
any1 = '123';
any1 = function (value) { return value; };
var y = 123;
// y = '123' //error
var y1;
y1 = 123; //ok
y1 = '123'; //ok
var nums = [101, 102, 103, '104'];
var res = nums.find(function (num) { return typeof num === 'number'; });
var num1 = res;
// const pow = res * res //error
var pow1 = num1 * num1;
var user = {
    id: '001',
    name: '1'
};
// user.name = '2' //error
function fn3(user) {
    console.log(user);
}
fn3(user);
var Student = /** @class */ (function () {
    function Student() {
    }
    Student.prototype.study = function (subject) {
        return "\u5B66\u4E60".concat(subject);
    };
    return Student;
}());
var Person = /** @class */ (function (_super) {
    __extends(Person, _super);
    function Person(name, age, gender) {
        var _this = _super.call(this) || this;
        _this.name = name;
        _this.age = age;
        _this.gender = gender;
        return _this;
    }
    Person.prototype.eat = function (num) {
        return "".concat(this.name, "\u5403").concat(num, "\u7897\u996D");
    };
    Person.prototype.sleep = function (time) {
        return "".concat(this.name).concat(time, "\u5F00\u59CB\u7761\u89C9");
    };
    return Person;
}(Student));
var person = new Person('张三', 12, true);
// person.name = '李四' //error
//
// const age = person.age //error
// const gender = person.gender //error
console.log(person.study('语文')); // 学习语文
console.log(person.sleep('11:00')); //张三11:00开始睡觉
function createArray(length, value) {
    return Array(length).fill(value);
}
var numbers = createArray(3, 100); // [100,100,100]
var strings = createArray(3, '100'); // ['100','100','100']
var iObj = { value: '1' };
var nObj = { value: 1 };
