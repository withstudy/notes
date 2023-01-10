const a: string = '1234'
const b: number = 1234 // NaN Infinity
const c: boolean = true // false
const d: string = null //非严格模式 基本数据类型可以赋值null

const arr1: Array<string> = ['1','2','3']
const arr2: number[] = [1,2,3]
const arr4: [number,string] = [1,'3']



const f: object = {id:'001'} // function (){} []
const h: {id:string,name:string,age:number} = {id: '001',name:'b',age:10}
const o: {} = {}

function fn1(name?:string,age:number = 10):string {
    return `name:${name},age:${age}`
}

fn1('123',12)
fn1('123') // ok
fn1()

const fn2:(name:string,sex:string) => string = function (name,sex = '10'){
    return `name:${name},sex:${sex}`
}


enum Status {
    one,//0
    two,//1
    three=5,//3
    four //6
}

// const enum StaticStatus {
//     stop='0',
//     start='1',
//     wait='3'
// }

let any1:any = 123

any1 = '123'

any1 = value => value


let y = 123

// y = '123' //error

let y1

y1 = 123 //ok

y1 = '123' //ok



const nums = [101,102,103,'104']

const res = nums.find(num => typeof num === 'number')

const num1 = res as number

// const pow = res * res //error

const pow1 = num1 * num1


interface User{
    id:string
    readonly name:string
    age?:number
}

const user: User = {
    id: '001',
    name: '1'
}

interface Post{
    [prop:string]: string | number
}

// user.name = '2' //error

function fn3(user:User):void{
    console.log(user)
}

fn3(user)

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

// person.name = '李四' //error
//
// const age = person.age //error
// const gender = person.gender //error

console.log(person.study('语文')) // 学习语文

console.log(person.sleep('11:00')) //张三11:00开始睡觉


function createArray<T>(length:number,value:T):T[]{
    return Array<T>(length).fill(value)
}

const numbers = createArray<number>(3,100) // [100,100,100]
const strings = createArray<string>(3,'100') // ['100','100','100']

const iObj:obj = {value: '1'}
const nObj: BB.PP = {value: 1}
