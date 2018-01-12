// Modules
import {COUNT, INDEXES, THEME_COLORS} from "../common";
import {Form, FormButton, FormHidden, FormInput} from "./form";
import BaseComponent from "./base";
import PropTypes from "prop-types";
import React from "react";

export default class ProfileComponent extends BaseComponent {
    static propTypes = {
        border: PropTypes.bool,
        emailInputClass: PropTypes.string,
        metadataInputClass: PropTypes.string,
        onUpdateProfile: PropTypes.func.isRequired,
        padding: PropTypes.bool,
        profile: PropTypes.shape({
            email: PropTypes.string.isRequired,
            metadata: PropTypes.object.isRequired
        }),
        updateButtonClass: PropTypes.string,
        ...BaseComponent.propTypes
    }

    constructor(props) {
        super(props);

        this.state = {
            ...this.state,
            email: this.props.profile.email,
            metadata: this.props.profile.metadata
        };

        this.setThemeColorCreator = this.setThemeColorCreator.bind(this);
        this.update = this.update.bind(this);
    }

    renderMetadata() {
        return Object
            .keys(this.state.metadata)
            .filter((key) => !this.state.metadata[key].hidden)
            .map((key, index) => {
                const {disableComponent: disabled} = this.state;
                const label = `${key.substr(INDEXES.FIRST, COUNT.ONE).toUpperCase()}${key.substr(INDEXES.SECOND)}`;
                const {metadataInputClass: inputClass} = this.props;
                const {type, value} = this.state.metadata[key];

                switch (type) {
                case "date":
                    return <FormInput disabled={disabled} inputClass={inputClass} key={index} label={label} max="2100-12-31" min="1800-01-01" name={key} onChange={this.onChange} placeholder={label} type="date" value={value} />;
                case "email":
                case "text":
                    return <FormInput disabled={disabled} inputClass={inputClass} key={index} label={label} name={key} onChange={this.onChange} placeholder={label} type="input" value={value} />;
                case "theme":
                    return <div key={index}>
                        <div className="stitching-theme-container">
                            Theme color: {this.renderThemeColors()}
                        </div>
                        <FormHidden disabled={disabled} name={key} type="theme" value={value} />
                    </div>;
                default:
                    return null;
                }
            });
    }

    renderThemeColors() {
        return Object.keys(THEME_COLORS).map((key, index) => {
            const setThemeColor = this.setThemeColorCreator(THEME_COLORS[key]);
            const selected = this.state.themeColor.indexOf(THEME_COLORS[key]) >= INDEXES.FIRST ? " stitching-theme-box-container-selected" : "";
            const style = {
                backgroundColor: THEME_COLORS[key],
                padding: THEME_COLORS[key] === this.state.themeColor ? "2px" : ""
            };

            return (
                <div className={`stitching-theme-box-container${selected}`} key={index} onClick={setThemeColor}>
                    <span className="stitching-theme-box" key={index} style={style} />
                </div>
            );
        });
    }

    setThemeColorCreator(themeColor) {
        return () => {
            this.setState({
                themeColor: `stitching-theme-${themeColor}`
            });
            this.onChange({
                target: {
                    form: {
                        ...this.state.metadata,
                        themeColor: {
                            type: "theme",
                            value: themeColor
                        }
                    }
                }
            });
        };
    }

    update(event) {
        event.preventDefault();
        this.disableComponent();

        this.stitching.auth
            .updateMetadata(this.state.metadata)
            .then(this.setMessage)
            .then(() => {
                this.props.onUpdateProfile({
                    email: this.state.email,
                    metadata: this.state.metadata
                });
            })
            .catch((err) => {
                this.setError(err);
            })
            .then(() => {
                this.enableComponent();
            });
    }

    render() {
        const {disableComponent, email, id, message, messageClass, themeColor} = this.state;

        return (
            <div className={themeColor}>
                <Form border={this.props.border} id={`${id}_ProfileForm`} message={message} messageClass={messageClass} padding={this.props.padding}>
                    <FormInput disabled={disableComponent} inputClass={this.props.emailInputClass} name="email" onChange={this.onChange} placeholder="Email" type="input" value={email} />
                    {this.renderMetadata()}
                    <FormButton buttonClass={this.props.updateButtonClass} disabled={disableComponent} onClick={this.update} text="Update" />
                </Form>
            </div>
        );
    }
}
