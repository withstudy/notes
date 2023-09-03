'use strict';

const moduleA = require('..');
const assert = require('assert').strict;

assert.strictEqual(moduleA(), 'Hello from moduleA');
console.info('moduleA tests passed');
