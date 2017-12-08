"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _base = require("./base");

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Modules


var StitchingConfirmComponent = function (_StitchingBaseCompone) {
    _inherits(StitchingConfirmComponent, _StitchingBaseCompone);

    function StitchingConfirmComponent() {
        _classCallCheck(this, StitchingConfirmComponent);

        return _possibleConstructorReturn(this, (StitchingConfirmComponent.__proto__ || Object.getPrototypeOf(StitchingConfirmComponent)).apply(this, arguments));
    }

    _createClass(StitchingConfirmComponent, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            var _this2 = this;

            this.stitching.auth.emailConfirm(this.props.tokenId, this.props.token).then(this.setMessage).catch(function (err) {
                _this2.setError(err);
            }).then(function () {
                _this2.enableComponent();
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

    return StitchingConfirmComponent;
}(_base2.default);

StitchingConfirmComponent.propTypes = _extends({
    token: _propTypes2.default.string,
    tokenId: _propTypes2.default.string
}, _base2.default.propTypes);
exports.default = StitchingConfirmComponent;