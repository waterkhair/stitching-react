"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require("../resources/react.css");

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _stitching = require("stitching");

var _stitching2 = _interopRequireDefault(_stitching);

var _common = require("../common");

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Modules


// Constants
var DEFAULT_MESSAGE_TIMEOUT = 3000;
var STATE = {
    confirmNewPassword: "value",
    email: "value",
    message: "value",
    messageClass: "value",
    metadata: "object",
    newPassword: "value",
    password: "value",
    token: null,
    tokenId: null
};

var StitchingBaseComponent = function (_React$Component) {
    _inherits(StitchingBaseComponent, _React$Component);

    function StitchingBaseComponent(props) {
        _classCallCheck(this, StitchingBaseComponent);

        var _this = _possibleConstructorReturn(this, (StitchingBaseComponent.__proto__ || Object.getPrototypeOf(StitchingBaseComponent)).call(this, props));

        _this.state = {
            disableComponent: false,
            id: (0, _utils.getRandomId)(),
            message: null,
            messageClass: null,
            messageTimeoutLength: props.messageTimeout ? props.messageTimeout : DEFAULT_MESSAGE_TIMEOUT,
            themeColor: "stitching-theme-" + (props.themeColor ? props.themeColor : _common.THEME_COLORS.BLACK)
        };

        _this.onChange = _this.onChange.bind(_this);
        _this.messageTimeout = null;
        _this.setMessage = _this.setMessage.bind(_this);
        _this.stitching = _stitching2.default;
        return _this;
    }

    _createClass(StitchingBaseComponent, [{
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            clearTimeout(this.messageTimeout);
        }
    }, {
        key: "disableComponent",
        value: function disableComponent() {
            this.setState({
                disableComponent: true
            });
        }
    }, {
        key: "enableComponent",
        value: function enableComponent() {
            this.setState({
                disableComponent: false
            });
        }
    }, {
        key: "onChange",
        value: function onChange(event) {
            var form = event.target.form;

            var state = {};

            Object.keys(STATE).forEach(function (stateKey) {
                if (form[stateKey]) {
                    state[stateKey] = form[stateKey].value;
                }
            });

            if (this.state.metadata) {
                state.metadata = {};

                Object.keys(this.state.metadata).forEach(function (metadataKey) {
                    if (form[metadataKey]) {
                        state.metadata[metadataKey] = {
                            type: form[metadataKey].dataset && form[metadataKey].dataset.type ? form[metadataKey].dataset.type : form[metadataKey].type,
                            value: form[metadataKey].value
                        };
                    }
                });
            }

            this.setState(state);
        }
    }, {
        key: "setError",
        value: function setError(err) {
            clearTimeout(this.messageTimeout);

            this.setState({
                message: err.message.toUpperCase(),
                messageClass: "error-message"
            });
        }
    }, {
        key: "setMessage",
        value: function setMessage(message) {
            var _this2 = this;

            clearTimeout(this.messageTimeout);

            this.setState({
                message: message.toUpperCase(),
                messageClass: "message"
            });

            this.messageTimeout = setTimeout(function () {
                clearTimeout(_this2.messageTimeout);
                _this2.setState({
                    message: null,
                    messageClass: null
                });
            }, this.state.messageTimeoutLength);
        }
    }]);

    return StitchingBaseComponent;
}(_react2.default.Component);

StitchingBaseComponent.propTypes = {
    messageTimeout: _propTypes2.default.number,
    themeColor: _propTypes2.default.oneOf([null, "", _common.THEME_COLORS.BLACK, _common.THEME_COLORS.BLUE, _common.THEME_COLORS.GREEN, _common.THEME_COLORS.RED])
};
exports.default = StitchingBaseComponent;