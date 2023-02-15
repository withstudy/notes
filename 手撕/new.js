// 1.创建一个对象，并且设置原型为构造函数的原型
// 2.将对象带入到构造函数中执行
// 3.如果构造函数返回的结果是对象则返回该对象，否则返回创建的对象
function _new(fn,...args){
    const _this = Object.create(fn.prototype)

    const res = fn.apply(_this,args)
    if(typeof res === 'object' && res !== null){
        return res
    }
    return _this
}

function Person(name,sex){
    this.name = name
    this.sex = sex
}

function Person1(name,sex){
    this.name = name
    this.sex = sex
    return {name:'hhh',sex: 11}
}

console.log(_new(Person,'xxx',18))
console.log(_new(Person1,'xxx',18))
