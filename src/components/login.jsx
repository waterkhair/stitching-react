// Modules
import {Form, FormButton, FormInput, SocialNetworkLogin} from "./form";
import BaseComponent from "./base";
import PropTypes from "prop-types";
import React from "react";
import {providers} from "stitching";

// Constants
const SELECTED_TAB_WITH_BORDER_STYLE = {
    boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)"
};

// Helpers
const renderSocialButton = (disableComponent, letter, onClick) => (
    <SocialNetworkLogin disabled={disableComponent} buttonClass="rotate" onClick={onClick} text={letter} />
);

export default class LoginComponent extends BaseComponent {
    static propTypes = {
        disableBorder: PropTypes.bool,
        emailInputClass: PropTypes.string,
        facebookButton: PropTypes.bool,
        googleButton: PropTypes.bool,
        loginButtonClass: PropTypes.string,
        onAuthenticated: PropTypes.func,
        onLogin: PropTypes.func.isRequired,
        onResetPassword: PropTypes.func.isRequired,
        passwordInputClass: PropTypes.string,
        registerButtonClass: PropTypes.string,
        resetPassowrdButtonClass: PropTypes.string,
        twitterButton: PropTypes.bool,
        ...BaseComponent.propTypes
    }

    constructor(props) {
        super(props);

        this.state = {
            ...this.state,
            email: null,
            password: null,
            registering: false
        };

        this.authenticateCreator = this.authenticateCreator.bind(this);
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.swapForm = this.swapForm.bind(this);
    }

    authenticateCreator(provider) {
        return (event) => {
            event.preventDefault();
            this.disableComponent();

            this.stitching.auth
                .authenticate(provider)
                .catch((err) => {
                    this.enableComponent();
                    this.setError(err);
                });
        };
    }

    login(event) {
        event.preventDefault();
        this.disableComponent();

        this.stitching.auth
            .login(this.state.email, this.state.password)
            .then((userProfile) => {
                if (userProfile) {
                    this.props.onLogin(userProfile);
                }
            })
            .catch((err) => {
                this.enableComponent();
                this.setError(err);
            });
    }

    register(event) {
        event.preventDefault();
        this.disableComponent();

        this.stitching.auth
            .registerUser(this.state.email, this.state.password)
            .then((message) => {
                this.setMessage(message);

                if (this.props.onRegister) {
                    this.props.onRegister();
                }
            })
            .catch((err) => {
                this.setError(new Error(err.error));
            })
            .then(() => {
                this.enableComponent();
            });
    }

    swapForm() {
        this.setState((prevState) => ({
            message: null,
            messageClass: null,
            registering: !prevState.registering
        }));
    }

    render() {
        const {disableComponent, id, message, messageClass, themeColor} = this.state;

        return (
            <div className={themeColor}>
                <div className="stitching-tabs">
                    <span className={`stitching-tab${this.state.registering ? "" : " stitching-selected-tab"}`} onClick={this.swapForm} style={this.props.disableBorder ? null : SELECTED_TAB_WITH_BORDER_STYLE}>
                        Login
                    </span>
                    <span className={`stitching-tab${this.state.registering ? " stitching-selected-tab" : ""}`} onClick={this.swapForm} style={this.props.disableBorder ? null : SELECTED_TAB_WITH_BORDER_STYLE}>
                        Register
                    </span>
                </div>
                <Form disableBorder={this.props.disableBorder} id={`${id}_LoginForm`} message={message} messageClass={messageClass}>
                    <FormInput disabled={disableComponent} inputClass={this.props.emailInputClass} name="email" onChange={this.onChange} placeholder="Email" type="input" />
                    <FormInput disabled={disableComponent} inputClass={this.props.passwordInputClass} name="password" onChange={this.onChange} placeholder="Password" type="password" />
                    {this.state.registering
                        ? <FormButton buttonClass={this.props.registerButtonClass} disabled={disableComponent} onClick={this.register} text="Register" />
                        : <FormButton buttonClass={this.props.loginButtonClass} disabled={disableComponent} onClick={this.login} text="Login" />}
                    {this.state.registering ? null : <span className="form-link" onClick={this.props.onResetPassword}>Reset Password</span>}
                    {!this.state.registering && (this.props.facebookButton || this.props.googleButton || this.props.twitterButton)
                        ? <div>
                            <hr />
                            <h4>Login with a social network:</h4>
                            {this.props.facebookButton
                                ? renderSocialButton(disableComponent, "f", this.authenticateCreator(providers.Facebook))
                                : null}
                            {this.props.googleButton
                                ? renderSocialButton(disableComponent, "g", this.authenticateCreator(providers.Google))
                                : null}
                            {this.props.twitterButton
                                ? renderSocialButton(disableComponent, "t", this.authenticateCreator(providers.Twitter))
                                : null}
                        </div>
                        : null}
                </Form>
            </div>
        );
    }
}
