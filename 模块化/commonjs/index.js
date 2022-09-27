// const moduleA = require('./muduleA')
//
// moduleA.say()

const moduleB = require('./moduleB')
moduleB.friends.push('moduleF')
// moduleB.say()
console.log(moduleB.friends)

setTimeout(()=>{
    console.log(moduleB.friends)
},2000)

const moduleE = require('./moduleB')
console.log(moduleB.friends)

