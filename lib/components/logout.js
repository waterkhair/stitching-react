"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _base = require("./base");

var _base2 = _interopRequireDefault(_base);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Modules


var ConfirmComponent = function (_BaseComponent) {
    _inherits(ConfirmComponent, _BaseComponent);

    function ConfirmComponent() {
        _classCallCheck(this, ConfirmComponent);

        return _possibleConstructorReturn(this, (ConfirmComponent.__proto__ || Object.getPrototypeOf(ConfirmComponent)).apply(this, arguments));
    }

    _createClass(ConfirmComponent, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            var _this2 = this;

            this.stitching.auth.logout().then(this.setMessage).then(function () {
                _this2.props.onLogout();
            });
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: this.state.messageClass },
                _react2.default.createElement(
                    "strong",
                    null,
                    this.state.message
                )
            );
        }
    }]);

    return ConfirmComponent;
}(_base2.default);

ConfirmComponent.propTypes = _extends({
    onLogout: _propTypes2.default.func
}, _base2.default.propTypes);
exports.default = ConfirmComponent;