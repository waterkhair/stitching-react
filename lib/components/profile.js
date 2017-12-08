"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _common = require("../common");

var _form = require("./form");

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


var ProfileComponent = function (_BaseComponent) {
    _inherits(ProfileComponent, _BaseComponent);

    function ProfileComponent(props) {
        _classCallCheck(this, ProfileComponent);

        var _this = _possibleConstructorReturn(this, (ProfileComponent.__proto__ || Object.getPrototypeOf(ProfileComponent)).call(this, props));

        _this.state = _extends({}, _this.state, {
            email: _this.props.profile.email,
            metadata: _this.props.profile.metadata
        });

        _this.setThemeColorCreator = _this.setThemeColorCreator.bind(_this);
        _this.update = _this.update.bind(_this);
        return _this;
    }

    _createClass(ProfileComponent, [{
        key: "renderMetadata",
        value: function renderMetadata() {
            var _this2 = this;

            return Object.keys(this.state.metadata).filter(function (key) {
                return !_this2.state.metadata[key].hidden;
            }).map(function (key, index) {
                var disabled = _this2.state.disableComponent;

                var label = "" + key.substr(_common.INDEXES.FIRST, _common.COUNT.ONE).toUpperCase() + key.substr(_common.INDEXES.SECOND);
                var inputClass = _this2.props.metadataInputClass;
                var _state$metadata$key = _this2.state.metadata[key],
                    type = _state$metadata$key.type,
                    value = _state$metadata$key.value;


                switch (type) {
                    case "date":
                        return _react2.default.createElement(_form.FormInput, { disabled: disabled, inputClass: inputClass, key: index, label: label, name: key, onChange: _this2.onChange, placeholder: label, type: "date", value: value });
                    case "email":
                    case "text":
                        return _react2.default.createElement(_form.FormInput, { disabled: disabled, inputClass: inputClass, key: index, label: label, name: key, onChange: _this2.onChange, placeholder: label, type: "input", value: value });
                    case "theme":
                        return _react2.default.createElement(
                            "div",
                            { key: index },
                            _react2.default.createElement(
                                "div",
                                { className: "stitching-theme-container" },
                                "Theme color: ",
                                _this2.renderThemeColors()
                            ),
                            _react2.default.createElement(_form.FormHidden, { disabled: disabled, name: key, type: "theme", value: value })
                        );
                    default:
                        return null;
                }
            });
        }
    }, {
        key: "renderThemeColors",
        value: function renderThemeColors() {
            var _this3 = this;

            return Object.keys(_common.THEME_COLORS).map(function (key, index) {
                var setThemeColor = _this3.setThemeColorCreator(_common.THEME_COLORS[key]);
                var selected = _this3.state.themeColor.indexOf(_common.THEME_COLORS[key]) >= _common.INDEXES.FIRST ? " stitching-theme-box-container-selected" : "";
                var style = {
                    backgroundColor: _common.THEME_COLORS[key],
                    padding: _common.THEME_COLORS[key] === _this3.state.themeColor ? "2px" : ""
                };

                return _react2.default.createElement(
                    "div",
                    { className: "stitching-theme-box-container" + selected, key: index, onClick: setThemeColor },
                    _react2.default.createElement("span", { className: "stitching-theme-box", key: index, style: style })
                );
            });
        }
    }, {
        key: "setThemeColorCreator",
        value: function setThemeColorCreator(themeColor) {
            var _this4 = this;

            return function () {
                _this4.setState({
                    themeColor: "stitching-theme-" + themeColor
                });
                _this4.onChange({
                    target: {
                        form: _extends({}, _this4.state.metadata, {
                            themeColor: {
                                type: "theme",
                                value: themeColor
                            }
                        })
                    }
                });
            };
        }
    }, {
        key: "update",
        value: function update(event) {
            var _this5 = this;

            event.preventDefault();
            this.disableComponent();

            this.stitching.auth.updateMetadata(this.state.metadata).then(this.setMessage).then(function () {
                _this5.props.onUpdateProfile({
                    email: _this5.state.email,
                    metadata: _this5.state.metadata
                });
            }).catch(function (err) {
                _this5.setError(err);
            }).then(function () {
                _this5.enableComponent();
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _state = this.state,
                disableComponent = _state.disableComponent,
                email = _state.email,
                id = _state.id,
                message = _state.message,
                messageClass = _state.messageClass,
                themeColor = _state.themeColor;


            return _react2.default.createElement(
                "div",
                { className: themeColor },
                _react2.default.createElement(
                    _form.Form,
                    { formClass: "stitching-form", id: id + "_ProfileForm", message: message, messageClass: messageClass },
                    _react2.default.createElement(_form.FormInput, { disabled: disableComponent, inputClass: this.props.emailInputClass, name: "email", onChange: this.onChange, placeholder: "Email", type: "input", value: email }),
                    this.renderMetadata(),
                    _react2.default.createElement(_form.FormButton, { buttonClass: this.props.updateButtonClass, disabled: disableComponent, onClick: this.update, text: "Update" })
                )
            );
        }
    }]);

    return ProfileComponent;
}(_base2.default);

ProfileComponent.propTypes = _extends({
    emailInputClass: _propTypes2.default.string,
    metadataInputClass: _propTypes2.default.string,
    onUpdateProfile: _propTypes2.default.func.isRequired,
    profile: _propTypes2.default.shape({
        email: _propTypes2.default.string.isRequired,
        metadata: _propTypes2.default.object.isRequired
    }),
    updateButtonClass: _propTypes2.default.string
}, _base2.default.propTypes);
exports.default = ProfileComponent;