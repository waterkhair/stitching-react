"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _form = require("./form");

var _base = require("./base");

var _base2 = _interopRequireDefault(_base);

var _common = require("../common");

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Modules


var ResetPasswordComponent = function (_BaseComponent) {
    _inherits(ResetPasswordComponent, _BaseComponent);

    function ResetPasswordComponent(props) {
        _classCallCheck(this, ResetPasswordComponent);

        var _this = _possibleConstructorReturn(this, (ResetPasswordComponent.__proto__ || Object.getPrototypeOf(ResetPasswordComponent)).call(this, props));

        _this.state = _extends({}, _this.state, {
            confirmNewPassword: null,
            newPassword: null,
            token: props.token,
            tokenId: props.tokenId
        });

        _this.passwordReset = _this.passwordReset.bind(_this);
        _this.sendPasswordReset = _this.sendPasswordReset.bind(_this);
        return _this;
    }

    _createClass(ResetPasswordComponent, [{
        key: "passwordReset",
        value: function passwordReset(event) {
            var _this2 = this;

            event.preventDefault();

            if (this.state.newPassword && this.state.confirmNewPassword) {
                if (this.state.newPassword === this.state.confirmNewPassword) {
                    this.disableComponent();

                    this.stitching.auth.passwordReset(this.state.tokenId, this.state.token, this.state.newPassword).then(this.setMessage).then(function () {
                        _this2.enableComponent();
                        _this2.props.onPasswordReset();
                    }).catch(function (err) {
                        _this2.setError(new Error(err.error));
                    });
                } else {
                    this.setError(new Error(_common.MESSAGES.PASSWORDS_DOES_NOT_MATCH));
                }
            } else {
                this.setError(new Error(_common.MESSAGES.INVALID_PASSWORD));
            }
        }
    }, {
        key: "sendPasswordReset",
        value: function sendPasswordReset(event) {
            var _this3 = this;

            event.preventDefault();
            this.disableComponent();

            this.stitching.auth.sendPasswordReset(this.state.email).then(this.setMessage).then(function () {
                _this3.props.onSendResetPassword(_this3.state.email);
            }).catch(function (err) {
                _this3.setError(new Error(err.error));
            }).then(function () {
                _this3.enableComponent();
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _state = this.state,
                disabled = _state.disableComponent,
                id = _state.id,
                message = _state.message,
                messageClass = _state.messageClass,
                themeColor = _state.themeColor,
                token = _state.token,
                tokenId = _state.tokenId;
            var _props = this.props,
                confirmNewPasswordInputClass = _props.confirmNewPasswordInputClass,
                emailInputClass = _props.emailInputClass,
                newPasswordInputClass = _props.newPasswordInputClass,
                resetPasswordButtonClass = _props.resetPasswordButtonClass,
                sendPasswordButtonClass = _props.sendPasswordButtonClass;


            if (token && tokenId) {
                return _react2.default.createElement(
                    "div",
                    { className: themeColor },
                    _react2.default.createElement(
                        _form.Form,
                        { disableBorder: this.props.disableBorder, id: id + "_ResetPasswordForm", message: message, messageClass: messageClass },
                        _react2.default.createElement(_form.FormInput, { disabled: disabled, inputClass: newPasswordInputClass, name: "newPassword", onChange: this.onChange, placeholder: _common.MESSAGES.NEW_PASSWORD, type: "password" }),
                        _react2.default.createElement(_form.FormInput, { disabled: disabled, inputClass: confirmNewPasswordInputClass, name: "confirmNewPassword", onChange: this.onChange, placeholder: _common.MESSAGES.CONFIRM_NEW_PASSWORD, type: "password" }),
                        _react2.default.createElement(_form.FormButton, { buttonClass: resetPasswordButtonClass, disabled: disabled, onClick: this.passwordReset, text: _common.MESSAGES.RESET_PASSWORD })
                    )
                );
            }

            return _react2.default.createElement(
                "div",
                { className: themeColor },
                _react2.default.createElement(
                    _form.Form,
                    { disableBorder: this.props.disableBorder, id: id + "_ResetPasswordForm", message: message, messageClass: messageClass },
                    _react2.default.createElement(_form.FormInput, { disabled: disabled, inputClass: emailInputClass, name: "email", onChange: this.onChange, placeholder: _common.MESSAGES.EMAIL, type: "input" }),
                    _react2.default.createElement(_form.FormButton, { buttonClass: sendPasswordButtonClass, disabled: disabled, onClick: this.sendPasswordReset, text: _common.MESSAGES.SEND_EMAIL })
                )
            );
        }
    }]);

    return ResetPasswordComponent;
}(_base2.default);

ResetPasswordComponent.propTypes = _extends({
    confirmNewPasswordInputClass: _propTypes2.default.string,
    disableBorder: _propTypes2.default.bool,
    emailInputClass: _propTypes2.default.string,
    newPasswordInputClass: _propTypes2.default.string,
    onPasswordReset: _propTypes2.default.func.isRequired,
    onSendResetPassword: _propTypes2.default.func.isRequired,
    resetPasswordButtonClass: _propTypes2.default.string,
    sendPasswordButtonClass: _propTypes2.default.string,
    token: _propTypes2.default.string,
    tokenId: _propTypes2.default.string
}, _base2.default.propTypes);
exports.default = ResetPasswordComponent;