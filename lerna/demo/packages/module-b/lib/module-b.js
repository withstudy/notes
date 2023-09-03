'use strict';

const moduleA = require('module-a');
console.log(moduleA())

module.exports = moduleB;

function moduleB() {
  return 'Hello from moduleB';
}
