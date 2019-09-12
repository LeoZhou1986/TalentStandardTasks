/* Social media JSX */
import React from 'react';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Button, Icon } from 'semantic-ui-react';

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
            newContact: linkedAccounts
        };
        this.saveContact = this.saveContact.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    saveContact() {
        console.log("SocialMediaLinkedAccount Save:", this.state.newContact);
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        let formErrors = this.state.formErrors;
        let fieldValid;
        switch (name) {
            case 'linkedIn':
                fieldValid = value === "" ? true : value.match(/^https:\/\/www.linkedin.com\/*/i);
                formErrors.linkedIn = fieldValid ? '' : 'LinkedIn URL is invalid';
                break;
            case 'github':
                fieldValid = value === "" ? true : value.match(/^https:\/\/github.com\/*/i);
                formErrors.github = fieldValid ? '' : 'GitHub URL is invalid';
                break
            default:
                break;
        }

        let formValid = true;
        Object.keys(formErrors).forEach(field => {
            if (formErrors[field] != '') {
                formValid = false;
            }
        });

        this.setState({
            formErrors: formErrors,
            formValid: formValid,
            newContact: Object.assign({}, this.state.newContact, { [name]: value })
        });
    };

    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    };

    renderEdit() {
        console.log(this.state);
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
                    type='button'
                    color='teal'
                    disabled={!this.state.formValid}
                    onClick={this.saveContact}
                >
                    Save
                </Button>
                <Button type='button' onClick={() => this.setState({ showEditSection: false })}>
                    Cancel
                </Button>
            </div>
        )
    };

    renderDisplay() {
        return (
            <div className='ui sixteen wide column'>
                <Button
                    type='button'
                    color='linkedin'
                    disabled={this.props.linkedAccounts.linkedIn === ""}
                    onClick={e => window.open(this.props.linkedAccounts.linkedIn, "_blank")}
                >
                    <Icon name='linkedin' /> LinkedIn
                </Button>
                <Button
                    type='button'
                    color='black'
                    disabled={this.props.linkedAccounts.github === ""}
                    onClick={e => window.open(this.props.linkedAccounts.github, "_blank")}
                >
                    <Icon name='github'/> GitHub
                </Button>
                <Button type='reset' color='teal' floated='right' onClick={e => {
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