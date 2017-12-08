"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _form = require("./form");

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _base = require("./base");

var _base2 = _interopRequireDefault(_base);

var _stitching = require("stitching");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Modules


// Helpers
var renderSocialButton = function renderSocialButton(disableComponent, letter, onClick) {
    return _react2.default.createElement(_form.SocialNetworkLogin, { disabled: disableComponent, buttonClass: "rotate", onClick: onClick, text: letter });
};

var StitchingLoginComponent = function (_StitchingBaseCompone) {
    _inherits(StitchingLoginComponent, _StitchingBaseCompone);

    function StitchingLoginComponent(props) {
        _classCallCheck(this, StitchingLoginComponent);

        var _this = _possibleConstructorReturn(this, (StitchingLoginComponent.__proto__ || Object.getPrototypeOf(StitchingLoginComponent)).call(this, props));

        _this.state = _extends({}, _this.state, {
            email: null,
            password: null,
            registering: false
        });

        _this.authenticateCreator = _this.authenticateCreator.bind(_this);
        _this.login = _this.login.bind(_this);
        _this.register = _this.register.bind(_this);
        _this.swapForm = _this.swapForm.bind(_this);
        return _this;
    }

    _createClass(StitchingLoginComponent, [{
        key: "authenticateCreator",
        value: function authenticateCreator(provider) {
            var _this2 = this;

            return function (event) {
                event.preventDefault();
                _this2.disableComponent();

                _this2.stitching.auth.authenticate(provider).catch(function (err) {
                    _this2.enableComponent();
                    _this2.setError(err);
                });
            };
        }
    }, {
        key: "login",
        value: function login(event) {
            var _this3 = this;

            event.preventDefault();
            this.disableComponent();

            this.stitching.auth.login(this.state.email, this.state.password).then(function (userProfile) {
                if (userProfile) {
                    _this3.props.onLogin(userProfile);
                }
            }).catch(function (err) {
                _this3.enableComponent();
                _this3.setError(err);
            });
        }
    }, {
        key: "register",
        value: function register(event) {
            var _this4 = this;

            event.preventDefault();
            this.disableComponent();

            this.stitching.auth.registerUser(this.state.email, this.state.password).then(function (message) {
                _this4.setMessage(message);

                if (_this4.props.onRegister) {
                    _this4.props.onRegister();
                }
            }).catch(function (err) {
                _this4.setError(new Error(err.error));
            }).then(function () {
                _this4.enableComponent();
            });
        }
    }, {
        key: "swapForm",
        value: function swapForm() {
            this.setState({
                message: null,
                messageClass: null,
                registering: !this.state.registering
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _state = this.state,
                disableComponent = _state.disableComponent,
                id = _state.id,
                message = _state.message,
                messageClass = _state.messageClass,
                themeColor = _state.themeColor;


            return _react2.default.createElement(
                "div",
                { className: themeColor },
                _react2.default.createElement(
                    "div",
                    { className: "stitching-tabs" },
                    _react2.default.createElement(
                        "span",
                        { className: "stitching-tab" + (this.state.registering ? "" : " stitching-selected-tab"), onClick: this.swapForm },
                        "Login"
                    ),
                    _react2.default.createElement(
                        "span",
                        { className: "stitching-tab" + (this.state.registering ? " stitching-selected-tab" : ""), onClick: this.swapForm },
                        "Register"
                    )
                ),
                _react2.default.createElement(
                    _form.Form,
                    { formClass: "stitching-form", id: id + "_LoginForm", message: message, messageClass: messageClass },
                    _react2.default.createElement(_form.FormInput, { disabled: disableComponent, inputClass: this.props.emailInputClass, name: "email", onChange: this.onChange, placeholder: "Email", type: "input" }),
                    _react2.default.createElement(_form.FormInput, { disabled: disableComponent, inputClass: this.props.passwordInputClass, name: "password", onChange: this.onChange, placeholder: "Password", type: "password" }),
                    this.state.registering ? _react2.default.createElement(_form.FormButton, { buttonClass: this.props.registerButtonClass, disabled: disableComponent, onClick: this.register, text: "Register" }) : _react2.default.createElement(_form.FormButton, { buttonClass: this.props.loginButtonClass, disabled: disableComponent, onClick: this.login, text: "Login" }),
                    this.state.registering ? null : _react2.default.createElement(
                        "span",
                        { className: "form-link", onClick: this.props.onResetPassword },
                        "Reset Password"
                    ),
                    !this.state.registering && (this.props.facebookButton || this.props.googleButton || this.props.twitterButton) ? _react2.default.createElement(
                        "div",
                        null,
                        _react2.default.createElement("hr", null),
                        _react2.default.createElement(
                            "h4",
                            null,
                            "Login with a social network:"
                        ),
                        this.props.facebookButton ? renderSocialButton(disableComponent, "f", this.authenticateCreator(_stitching.providers.Facebook)) : null,
                        this.props.googleButton ? renderSocialButton(disableComponent, "g", this.authenticateCreator(_stitching.providers.Google)) : null,
                        this.props.twitterButton ? renderSocialButton(disableComponent, "t", this.authenticateCreator(_stitching.providers.Twitter)) : null
                    ) : null
                )
            );
        }
    }]);

    return StitchingLoginComponent;
}(_base2.default);

StitchingLoginComponent.propTypes = _extends({
    emailInputClass: _propTypes2.default.string,
    facebookButton: _propTypes2.default.bool,
    googleButton: _propTypes2.default.bool,
    loginButtonClass: _propTypes2.default.string,
    onAuthenticated: _propTypes2.default.func,
    onLogin: _propTypes2.default.func.isRequired,
    onResetPassword: _propTypes2.default.func.isRequired,
    passwordInputClass: _propTypes2.default.string,
    registerButtonClass: _propTypes2.default.string,
    resetPassowrdButtonClass: _propTypes2.default.string,
    twitterButton: _propTypes2.default.bool
}, _base2.default.propTypes);
exports.default = StitchingLoginComponent;