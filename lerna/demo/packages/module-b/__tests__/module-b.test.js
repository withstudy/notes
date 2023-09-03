'use strict';

const moduleB = require('..');
const assert = require('assert').strict;

assert.strictEqual(moduleB(), 'Hello from moduleB');
console.info('moduleB tests passed');
