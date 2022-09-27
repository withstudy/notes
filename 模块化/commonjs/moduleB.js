const name = 'moduleB'
const age = 5
const say = () => {console.log(`${name}今年${age}岁`)}
const friends = ['moduleD']

setTimeout(()=>{
    friends.push('123')
},1000)

module.exports = {
    name,age,say,friends
}