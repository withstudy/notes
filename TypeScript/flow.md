# Flow

1. 安装

安装
```shell
npm install -D flow-bin
```
初始化
```shell
npm run flow init
```
执行
```shell
npm run flow
```

2. 基本使用
* 基本数据类型
```flow js
const num: number = 100
const str: string = '100'
const b: boolean = false
const n: null = null
const u: undefined = undefined
const obj: Object = {}
```
* 数组
```flow js
const nums:Array<number> = [1,2,3]
const users:Object[] = [{id:'001',name:'zhu'}]
//元组
const useState:[string,function] = ['1',value => value]
```
* 对象
```flow js
const user2:{id:string,name:string,age:number} = {id:'002',name:'haer',age:10}
// ?: 可选属性
const user3:{id:string,name:string,age:?number} = {id:'003',name:'hacc'}
// 无固定属性
const user4:{[string]:string} = {'id':'o004','name':'ss','age':'10'}
```
* 函数
```flow js
const fn = function (name:string,age:?number => string ){
    return name
}
fn(user2.name) // ok

// 自定义类型
type resType = {
    name:string,
    age:number
}

function fn2(user:resType => resType){
    return user
}

fn2({name:'005',age:18}) //ok
```
* mixed/any
```flow js
function fn3(param:mixed){
    // param.slice(0) //error
    // param * param //error
    if(typeof param === 'string'){
        param.slice(0) //ok
    }

    if(typeof param === 'number'){
        param * param //ok
    }
}

function fn4(param:any => void){
    param.slice(0) //ok
    param * param //ok
}
// mixed 和 any 都可以代表各种类型
// mixed是强类型, any是弱类型
```
* 运行环境API
```flow js
const dom: HTMLElement | null = document.getElementById('app')
//flow 提供运行环境api的类型检查
```