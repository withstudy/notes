"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
require("core-js/modules/es.function.name.js");
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var Person = /*#__PURE__*/function () {
  function Person(name) {
    (0, _classCallCheck2.default)(this, Person);
    this.name = name;
  }
  (0, _createClass2.default)(Person, [{
    key: "say",
    value: function say() {
      console.log("my name is ".concat(this.name));
    }
  }]);
  return Person;
}();
var person = new Person('liming');
person.say();
