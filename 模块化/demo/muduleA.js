const name = 'moduleA'
const age = 5
const say = () => {console.log(`${name}今年${age}岁`)}
const friends = ['moduleC']

console.log(exports === module.exports)

exports.name = name
exports.age = age
exports.say = say
exports.friends = friends