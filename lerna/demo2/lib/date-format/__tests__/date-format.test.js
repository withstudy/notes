'use strict';

const dateFormat = require('..');
const assert = require('assert').strict;

assert.strictEqual(dateFormat(), 'Hello from dateFormat');
console.info('dateFormat tests passed');
