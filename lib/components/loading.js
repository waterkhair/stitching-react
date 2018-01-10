"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _base = require("./base");

var _base2 = _interopRequireDefault(_base);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Modules


// Constants
var LOADING_SCREEN_STYLE = {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    height: "100vh",
    left: 0,
    position: "absolute",
    top: 0,
    width: "100vw",
    zIndex: 10
};
var LOADING_STYLE = {
    animation: "spin 2s linear infinite",
    border: "2vmin solid #f3f3f3",
    borderRadius: "50%",
    borderTop: "2vmin solid #555555",
    height: "50vmin",
    margin: "25vmin auto 0px",
    webkitAnimation: "spin 2s linear infinite",
    width: "50vmin"
};

var ConfirmComponent = function (_BaseComponent) {
    _inherits(ConfirmComponent, _BaseComponent);

    function ConfirmComponent(props) {
        _classCallCheck(this, ConfirmComponent);

        var _this = _possibleConstructorReturn(this, (ConfirmComponent.__proto__ || Object.getPrototypeOf(ConfirmComponent)).call(this, props));

        _this.renderLoading = _this.renderLoading.bind(_this);
        return _this;
    }

    _createClass(ConfirmComponent, [{
        key: "renderLoading",
        value: function renderLoading() {
            if (this.props.loading) {
                return _react2.default.createElement(
                    "div",
                    { style: LOADING_SCREEN_STYLE },
                    _react2.default.createElement("div", { style: LOADING_STYLE })
                );
            }

            return null;
        }
    }, {
        key: "render",
        value: function render() {
            return this.renderLoading();
        }
    }]);

    return ConfirmComponent;
}(_base2.default);

ConfirmComponent.propTypes = _extends({}, _base2.default.propTypes);
exports.default = ConfirmComponent;