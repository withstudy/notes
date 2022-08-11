---
title: TypeScript基础
date: 2022-03-16 16:27:27
categories: TypeScript
tags: [TypeScript]
description: 学习总结
cover: https://s2.loli.net/2022/08/11/R5JdtXuzUfnslQN.png
---

# TypeScript

## 一. 安装

```shell
npm install typescript --dev
```
生成`tsconfig.json`配置文件
```shell
tsc --init
```
> 常用配置项
>
> `target`: 编译之后的JavaScript版本;例如: es5、es2016
>
> `module`: 编译之后的模块化标准;例如: commonjs
>
> `rootDir`: 需要编译文件所在位置
>
> `strict`: 是否开启严格模式
>
> `lib`: 内置对象对应的声明所在的标准库列表; 例如: es2015; DOM(浏览器对象)

> 注意: 一旦生成配置文件，使用`tsc`命令不在可以编译一个文件; 比如: `tsc index.ts`

显示中文报错信息
```shell
tsc --locale zh-CN
```

## 二. 基本使用
```typescript
const a: string = '1234'
const b: number = 1234 // NaN Infinity
const c: boolean = true // false
// const d: string = null //非严格模式 可以赋值null

const e: Array<string> = null
const f: Object = {id:'001'} // function (){} []

function g(name:string):string {
    return name
}

const s = Symbol() 
```
> 在使用es2015新增的Symbol、Promise等新增对象的时候，如果你的配置文件中配置了`target:'es5'`，会编译不通过
>
> 原因: 配置`target:'es5'`所引入的标准库中没有这些对象的类型声明
>
> 解决办法:
>
> 1. 配置`target:'es2015'`
>
> 2. 通过配置`lib`更改引用的标准库; 例如: `lib: ['es2015','DOM']`;
     >
     >   注意: 需要引入`DOM`标准库，其中包括了浏览器对象的类型声明，否则`console`这些浏览器对象会编译不通过

### 1. 对象
```typescript
const a: object = {id:'001'} // function (){} []
//字面量
const o: {} = {}
const b: {id:string,name:string,age:number} = {id: '001',name:'b',age:10}
```

TypeScript中`object`类型并不只是包括对象，函数、数组等都是可以赋值给`object`类型的

可以通过`{}`字面量的形式来限制只能赋值为对象

也可以`{id:string,name:string,age:number}`来限制对象的成员，这种限制是强制的，对象的成员不能多也不能少，必须是声明的这些成员

### 2. 数组
```typescript
//泛型
const arr1: Array<string> = ['1','2','3']
const arr2: number[] = [1,2,3]
//元组
const arr3: [number,string] = [1,'3']
```

数组不可以通过`[]`字面量的形式来限制

想通过字面量必须指定数组元素的类型，例如: `[number,string]`,这样的被称为`元组`，并且`元组`和对象一样是强制的

### 3. 枚举
```typescript
enum Status {
    one,//0
    two,//1
    three=5,//3
    four //6
}
const fourStatus = Status.four // 6
//静态枚举
const enum StaticStatus {
    stop='0',
    start='1',
    wait='3'
}
```
枚举在你没有设置值的时候，默认从`0`开始递增; 例如: `Status`

如果你赋值一个数字，之后的枚举不赋值，那么之后的默认从赋值的值才是递增; 例如: `Status`

**普通的枚举是在编译之后的`js`文件中会产生一个`双向键值对对象`**

> `双向键值对对象`: 通过key可以拿到value，通过value可以拿到key

例如:`Status`编译成js之后
```js
var Status;
(function (Status) {
    Status[Status["one"] = 0] = "one";
    Status[Status["two"] = 1] = "two";
    Status[Status["three"] = 5] = "three";
    Status[Status["four"] = 6] = "four"; //6
})(Status || (Status = {}));
```
通过`const enum`创建`静态枚举`

`静态枚举`在编译之后不会产生`双向键值对对象`，而会使用值替换掉引用

比如: `const fourStatus = Status.four` 编译之后 `var stopStatus = 6`

> TypeScript中大多数特性都不会产生多余的代码，而是删除定义的代码

### 4. 函数

```typescript
function fn1(name?:string,age:number = 10):string {
    return `name:${name},age:${age}`
}

fn1('123',12)
fn1('123') // ok
fn1() //ok
//函数表达式
const fn2:(name:string,sex:string) => string = function (name,sex = '10'){
    return `name:${name},sex:${sex}`
}
```
在定义函数时，函数的限制是强制的，在调用时必须传入对应类型、数量的参数

你可以使用 **默认值** 或者 `?:` 的方式规避这种情况

在使用 **函数表达式** 来定义函数时，可以使用`(name:string,sex:string) => string`来规定函数的参数和返回值的类型

### 5. 任意类型(any)
```typescript
let any1:any = 123

any1 = '123'

any1 = value => value
```
**任意类型**可以接收任何类型的值，TypeScript不会对其进行类型检查，所以它是不安全的，应该减少使用

### 6.隐式类型推断
```typescript
let y = 123
y = '123' //error

let y1
y1 = 123 //ok
y1 = '123' //ok
```
**隐式类型推断** : 不指定变量的类型，通过所赋的值来推断变量的类型

比如:`let y = 123` y 就是 `number`类型

当变量在定义时没有赋值，那么该变量会被设置为`any`类型; 例如: 上面的`y1`变量

### 7. 类型断言
```typescript
const nums = [101,102,103,'104']

const res = nums.find(num => typeof num === 'number') // 类型推断为number | string

const num1 = res as number
const num2 = <number> res

const pow = res * res //error

const pow1 = num1 * num1 //ok
const pow2 = num2 * num2 //ok
```

**类型断言**: 当一个变量没有设置类型时，而开发者明确知道其会是什么类型，就可以类型断言

例子:
上面代码中`res`没有声明类型，TypeScript推断为`number | string`

所以`const pow = res * res`会编译报错

而作为开发者很确定`res`只会得到`number`类型的值，就可以使用**类型断言**

断言之后`const pow1 = num1 * num1`就可以编译通过了

**类型断言**有两种方式:
* as
* <[type]>

> 注意: 类型断言并不是类型转换

### 8. 接口
```typescript
interface User{
    id:string
    readonly name:string
    age?:number
}

const user: User = {
    id: '001',
    name: '1'
}
user.name = '2' //error

function fn3(user:User):void{
    console.log(user)
}

fn3(user)
```
接口一般用于定义对象成员的类型

* `?:`: 可选属性
* `readonly`: 只读属性

当不知道对象具体有那些属性时，可以
```typescript
interface Post{
    [prop:string]: string | number
}
```

### 9. 类
```typescript
interface Eat{
    eat:(num:number) => string
}

abstract class Student{
    study(subject:string):string{
        return `学习${subject}`
    }

    abstract sleep(time:string):string //抽象方法
}

class Person extends Student implements Eat{
    public readonly name:string
    private age:number
    protected gender: boolean

    constructor(name:string,age:number,gender:boolean) {
        super()
        this.name = name
        this.age = age
        this.gender = gender
    }

    eat(num:number):string{
        return `${this.name}吃${num}碗饭`
    }

    sleep(time:string):string{
        return `${this.name}${time}开始睡觉`
    }
}

const person = new Person('张三',12,true)

person.name = '李四' //error

const name = person.name //ok
const age = person.age //error
const gender = person.gender //error

console.log(person.study('语文')) // 学习语文

console.log(person.sleep('11:00')) //张三11:00开始睡觉
```

> 在声明类的属性的时候必须 赋初始值 或者 在`constructor`赋值

* 属性修饰符
    * `public`: 任何地方都可以访问该属性
    * `private`: 只有在该类中才能访问该属性
    * `protected`: 只有在该类或者集成该类的子类才能访问该属性
    * `static`: 静态属性
    * `readonly`: 只读属性

* 接口(interface)

接口可以设置属性的类型，某一个类在`implements`实现一个接口的时候，必须实现接口中设置的属性

* 抽象类

某一个类如果继承了一个抽象类，那么该类必须实现抽象类中的抽象方法，并且使用该类构建的实例会用于抽象类的函数

### 10. 泛型
```typescript
function createArray<T>(length:number,value:T):T[]{
    return Array<T>(length).fill(value)
}

const numbers = createArray<number>(3,100) // [100,100,100]
const strings = createArray<string>(3,'100') // ['100','100','100']
```

**泛型**: 指函数在定义时不知道具体类型，在函数调用的时候才确定具体的类型

### 11. 类型声明
```typescript
import { camelCase } from 'loadsh'

declare function camelCase(input:string):string
```
当我们引入安装的模块，如果模块中没有定义类型，需要我们自己定义一个类型，否则类型检查不通过

参考文档：[深入理解 TypeScript](https://jkchao.github.io/typescript-book-chinese/#why)