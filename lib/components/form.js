"use strict";

// Modules
var React = require("react");

// Constants
var FORM_BORDER_STYLE = {
    border: "solid 1px #666666",
    boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)"
};
var FORM_BUTTON_STYLE = {
    marginBottom: "10px",
    width: "100%"
};
var FORM_PADDING = {
    padding: "45px"
};
var FORM_SOCIAL_BUTTON_STYLE = {
    cursor: "pointer"
};

// Helpers
var renderFormMessage = function renderFormMessage(message, messageClass) {
    return React.createElement(
        "div",
        { className: messageClass },
        message
    );
};

module.exports.Form = function (_ref) {
    var border = _ref.border,
        children = _ref.children,
        id = _ref.id,
        message = _ref.message,
        messageClass = _ref.messageClass,
        padding = _ref.padding;
    return React.createElement(
        "form",
        { className: "stitching-form", id: id, style: Object.assign({}, border ? FORM_BORDER_STYLE : null, padding ? FORM_PADDING : null) },
        message ? renderFormMessage(message, messageClass) : null,
        children
    );
};

module.exports.FormButton = function (_ref2) {
    var buttonClass = _ref2.buttonClass,
        disabled = _ref2.disabled,
        onClick = _ref2.onClick,
        text = _ref2.text;
    return React.createElement(
        "button",
        { className: buttonClass, disabled: disabled, onClick: onClick, style: FORM_BUTTON_STYLE },
        text
    );
};

module.exports.FormHidden = function (_ref3) {
    var disabled = _ref3.disabled,
        name = _ref3.name,
        type = _ref3.type,
        value = _ref3.value;
    return React.createElement("input", { "data-type": type, disabled: disabled, name: name, type: "hidden", value: value });
};

module.exports.FormInput = function (_ref4) {
    var disabled = _ref4.disabled,
        inputClass = _ref4.inputClass,
        max = _ref4.max,
        min = _ref4.min,
        name = _ref4.name,
        type = _ref4.type,
        onChange = _ref4.onChange,
        placeholder = _ref4.placeholder,
        value = _ref4.value;
    return React.createElement("input", { className: inputClass, disabled: disabled, max: max, min: min, name: name, type: type, onChange: onChange, placeholder: placeholder, value: value });
};

module.exports.SocialNetworkLogin = function (_ref5) {
    var buttonClass = _ref5.buttonClass,
        onClick = _ref5.onClick,
        text = _ref5.text;
    return React.createElement(
        "span",
        { className: buttonClass, onClick: onClick, style: FORM_SOCIAL_BUTTON_STYLE },
        React.createElement(
            "span",
            { onClick: onClick },
            text
        )
    );
};