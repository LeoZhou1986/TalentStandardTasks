/* Social media JSX */
import React from 'react';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Segment, Button, Icon, Popup } from 'semantic-ui-react';

export default class SocialMediaLinkedAccount extends React.Component {
    constructor(props) {
        super(props);
        const linkedAccounts = props.linkedAccounts ?
            Object.assign({}, props.linkedAccounts)
            : {
                linkedIn: "",
                github: ""
            };

        this.state = {
            showEditSection: false,
            newContact: linkedAccounts,
            formErrors: { linkedIn: '', github: '' },
            formValid: false
        };
        this.openLink = this.openLink.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        //$('.ui.button.social-media').popup();
    };

    openLink(e, url) {
        e.preventDefault();
        window.open(url, "_blank");
    };

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            newContact: { [name]: value }
        }, () => this.validateField(name, value));
    };

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let fieldValid;
        switch (fieldName) {
            case 'linkedIn':
                fieldValid = value==="" ? true : value.match(/^https:\/\/www.linkedin.com\/*/i);
                fieldValidationErrors.linkedIn = fieldValid ? '' : 'LinkedIn URL is invalid';
                break;
            case 'github':
                fieldValid = value==="" ? true : value.match(/^https:\/\/github.com\/*/i);
                fieldValidationErrors.github = fieldValid ? '' : 'GitHub URL is invalid';
                break
            default:
                break;
        }

        let formValid = true;
        Object.keys(fieldValidationErrors).forEach(field => {
            if (fieldValidationErrors[field] != '') {
                formValid = false;
            }
        });

        this.setState({
            formErrors: fieldValidationErrors,
            formValid: formValid
        });
    };

    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    };

    renderEdit() {
        return (
            <div className='ui sixteen wide column'>
                <ChildSingleInput
                    inputType="text"
                    label="LinkedIn"
                    name="linkedIn"
                    placeholder="Enter your LinkedIn URL"
                    value={this.state.newContact.linkedIn}
                    isError={this.state.formErrors.linkedIn !== ""}
                    errorMessage={this.state.formErrors.linkedIn}
                    controlFunc={this.handleChange}
                />
                <ChildSingleInput
                    inputType="text"
                    label="GitHub"
                    name="github"
                    placeholder="Enter your GitHub URL"
                    value={this.state.newContact.github}
                    isError={this.state.formErrors.github !== ""}
                    errorMessage={this.state.formErrors.github}
                    controlFunc={this.handleChange}
                />
                <Button
                    color='teal'
                    disabled={!this.state.formValid}
                    onClick={this.saveContact}
                >
                    Save
                </Button>
                <Button onClick={() => { this.setState({ showEditSection: false }) }}>
                    Cancel
                </Button>
            </div>
        )
    };

    renderDisplay() {
        return (
            <div className='ui sixteen wide column'>
                <Button
                    color='linkedin'
                    disabled={this.props.linkedAccounts.linkedIn === ""}
                    onClick={e => this.openLink(e, this.props.linkedAccounts.linkedIn)}
                >
                    <Icon name='linkedin' /> LinkedIn
                </Button>
                <Button
                    color='black'
                    disabled={this.props.linkedAccounts.github === ""}
                    onClick={e => this.openLink(e, this.props.linkedAccounts.github)}
                >
                    <Icon name='github'/> GitHub
                </Button>
                <Button color='teal' floated='right' onClick={e => {
                    e.preventDefault();
                    this.setState({
                        showEditSection: true,
                        newContact: Object.assign({}, this.props.linkedAccounts),
                        formErrors: { linkedIn: '', github: '' },
                        formValid: true
                    })
                }}>
                    Edit
                </Button>
            </div>
        )
    };
}