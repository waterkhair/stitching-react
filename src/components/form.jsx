// Modules
const React = require("react");

// Constants
const FORM_BUTTON_STYLE = {
    marginBottom: "10px",
    width: "100%"
};
const FORM_SOCIAL_BUTTON_STYLE = {
    cursor: "pointer"
};

// Helpers
const renderFormMessage = (message, messageClass) => (
    <div className={messageClass}>
        {message}
    </div>
);

module.exports.Form = ({children, formClass, id, message, messageClass}) => (
    <form className={formClass} id={id}>
        {message ? renderFormMessage(message, messageClass) : null}
        {children}
    </form>
);

module.exports.FormButton = ({buttonClass, disabled, onClick, text}) => (
    <button className={buttonClass} disabled={disabled} onClick={onClick} style={FORM_BUTTON_STYLE}>
        {text}
    </button>
);

module.exports.FormHidden = ({disabled, name, type, value}) => (
    <input data-type={type} disabled={disabled} name={name} type="hidden" value={value} />
);

module.exports.FormInput = ({disabled, inputClass, name, type, onChange, placeholder, value}) => (
    <input className={inputClass} disabled={disabled} name={name} type={type} onChange={onChange} placeholder={placeholder} value={value} />
);

module.exports.SocialNetworkLogin = ({buttonClass, onClick, text}) => (
    <span className={buttonClass} onClick={onClick} style={FORM_SOCIAL_BUTTON_STYLE}>
        <span onClick={onClick}>
            {text}
        </span>
    </span>
);
