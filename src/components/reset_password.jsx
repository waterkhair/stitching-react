// Modules
import {Form, FormButton, FormInput} from "./form";
import BaseComponent from "./base";
import {MESSAGES} from "../common";
import PropTypes from "prop-types";
import React from "react";

export default class ResetPasswordComponent extends BaseComponent {
    static propTypes = {
        border: PropTypes.bool,
        confirmNewPasswordInputClass: PropTypes.string,
        emailInputClass: PropTypes.string,
        newPasswordInputClass: PropTypes.string,
        onPasswordReset: PropTypes.func.isRequired,
        onSendResetPassword: PropTypes.func.isRequired,
        padding: PropTypes.bool,
        resetPasswordButtonClass: PropTypes.string,
        sendPasswordButtonClass: PropTypes.string,
        token: PropTypes.string,
        tokenId: PropTypes.string,
        ...BaseComponent.propTypes
    }

    constructor(props) {
        super(props);

        this.state = {
            ...this.state,
            confirmNewPassword: null,
            newPassword: null,
            token: props.token,
            tokenId: props.tokenId
        };

        this.passwordReset = this.passwordReset.bind(this);
        this.sendPasswordReset = this.sendPasswordReset.bind(this);
    }

    passwordReset(event) {
        event.preventDefault();

        if (this.state.newPassword && this.state.confirmNewPassword) {
            if (this.state.newPassword === this.state.confirmNewPassword) {
                this.disableComponent();

                this.stitching.auth
                    .passwordReset(this.state.tokenId, this.state.token, this.state.newPassword)
                    .then(this.setMessage)
                    .then(() => {
                        this.enableComponent();
                        this.props.onPasswordReset();
                    })
                    .catch((err) => {
                        this.setError(new Error(err.error));
                    });
            } else {
                this.setError(new Error(MESSAGES.PASSWORDS_DOES_NOT_MATCH));
            }
        } else {
            this.setError(new Error(MESSAGES.INVALID_PASSWORD));
        }
    }

    sendPasswordReset(event) {
        event.preventDefault();
        this.disableComponent();

        this.stitching.auth
            .sendPasswordReset(this.state.email)
            .then(this.setMessage)
            .then(() => {
                this.props.onSendResetPassword(this.state.email);
            })
            .catch((err) => {
                this.setError(new Error(err.error));
            })
            .then(() => {
                this.enableComponent();
            });
    }

    render() {
        const {disableComponent: disabled, id, message, messageClass, themeColor, token, tokenId} = this.state;
        const {confirmNewPasswordInputClass, emailInputClass, newPasswordInputClass, resetPasswordButtonClass, sendPasswordButtonClass} = this.props;

        if (token && tokenId) {
            return (
                <div className={themeColor}>
                    <Form border={this.props.border} id={`${id}_ResetPasswordForm`} message={message} messageClass={messageClass} padding={this.props.padding}>
                        <FormInput disabled={disabled} inputClass={newPasswordInputClass} name="newPassword" onChange={this.onChange} placeholder={MESSAGES.NEW_PASSWORD} type="password" />
                        <FormInput disabled={disabled} inputClass={confirmNewPasswordInputClass} name="confirmNewPassword" onChange={this.onChange} placeholder={MESSAGES.CONFIRM_NEW_PASSWORD} type="password" />
                        <FormButton buttonClass={resetPasswordButtonClass} disabled={disabled} onClick={this.passwordReset} text={MESSAGES.RESET_PASSWORD} />
                    </Form>
                </div>
            );
        }

        return (
            <div className={themeColor}>
                <Form border={this.props.border} id={`${id}_ResetPasswordForm`} message={message} messageClass={messageClass} padding={this.props.padding}>
                    <FormInput disabled={disabled} inputClass={emailInputClass} name="email" onChange={this.onChange} placeholder={MESSAGES.EMAIL} type="input" />
                    <FormButton buttonClass={sendPasswordButtonClass} disabled={disabled} onClick={this.sendPasswordReset} text={MESSAGES.SEND_EMAIL} />
                </Form>
            </div>
        );
    }
}
