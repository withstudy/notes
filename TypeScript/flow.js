// @flow
//基本数据类型
const num: number = 100
const str: string = '100'
const b: boolean = false
const n: null = null
const u: undefined = undefined
const obj: Object = {}
//数组
const nums:Array<number> = [1,2,3]
const users:Object[] = [{id:'001',name:'zhu'}]
const useState:[string,function] = ['1',value => value]
// 对象
const user2:{id:string,name:string,age:number} = {id:'002',name:'haer',age:10}
// 可选
const user3:{id:string,name:string,age:?number} = {id:'003',name:'hacc'}

const user4:{[string]:string} = {'id':'o004','name':'ss','age':'10'}
// 函数
const fn = function (name:string,age:?number => string ){
    return name
}
fn(user2.name) // ok

type resType = {
    name:string,
    age:number
}

function fn2(user:resType => resType){
    return user
}

fn2({name:'005',age:18}) //ok
// mixed any
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

const dom: HTMLElement | null = document.getElementById('app')