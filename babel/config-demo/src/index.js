class Person {
    constructor(name) {
        this.name = name
    }

    say (){
        console.log(`my name is ${this.name}`)
    }
}

const person = new Person('liming')
person.say()
