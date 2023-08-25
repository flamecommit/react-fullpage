"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var Hello = function Hello(_ref) {
  var name = _ref.name;
  return /*#__PURE__*/_react.default.createElement("div", null, "Hello ", name);
};
var _default = Hello;
exports.default = _default;