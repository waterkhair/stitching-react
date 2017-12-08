// Modules
import "../resources/react.css";
import PropTypes from "prop-types";
import React from "react";
import Stitching from "stitching";
import {THEME_COLORS} from "../common";
import {getRandomId} from "../utils";

// Constants
const DEFAULT_MESSAGE_TIMEOUT = 3000;
const STATE = {
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

export default class BaseComponent extends React.Component {
    static propTypes = {
        messageTimeout: PropTypes.number,
        themeColor: PropTypes.oneOf([
            null,
            "",
            THEME_COLORS.BLACK,
            THEME_COLORS.BLUE,
            THEME_COLORS.GREEN,
            THEME_COLORS.RED
        ])
    }

    constructor(props) {
        super(props);

        this.state = {
            disableComponent: false,
            id: getRandomId(),
            message: null,
            messageClass: null,
            messageTimeoutLength: props.messageTimeout ? props.messageTimeout : DEFAULT_MESSAGE_TIMEOUT,
            themeColor: `stitching-theme-${props.themeColor ? props.themeColor : THEME_COLORS.BLACK}`
        };

        this.onChange = this.onChange.bind(this);
        this.messageTimeout = null;
        this.setMessage = this.setMessage.bind(this);
        this.stitching = Stitching;
    }

    componentWillUnmount() {
        clearTimeout(this.messageTimeout);
    }

    disableComponent() {
        this.setState({
            disableComponent: true
        });
    }

    enableComponent() {
        this.setState({
            disableComponent: false
        });
    }

    onChange(event) {
        const {form} = event.target;
        const state = {};

        Object.keys(STATE).forEach((stateKey) => {
            if (form[stateKey]) {
                state[stateKey] = form[stateKey].value;
            }
        });

        if (this.state.metadata) {
            state.metadata = {};

            Object.keys(this.state.metadata).forEach((metadataKey) => {
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

    setError(err) {
        clearTimeout(this.messageTimeout);

        this.setState({
            message: err.message.toUpperCase(),
            messageClass: "error-message"
        });
    }

    setMessage(message) {
        clearTimeout(this.messageTimeout);

        this.setState({
            message: message.toUpperCase(),
            messageClass: "message"
        });

        this.messageTimeout = setTimeout(() => {
            clearTimeout(this.messageTimeout);
            this.setState({
                message: null,
                messageClass: null
            });
        }, this.state.messageTimeoutLength);
    }
}
