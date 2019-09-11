/* Language section */
import React from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import { EditableTable } from '../Table/EditableTable.jsx';
import { SingleInput } from '../Form/SingleInput.jsx';
import { Grid, Dropdown, Button } from 'semantic-ui-react';

const languageLevels = [
    { key: "Basic", value: "Basic", text: "Basic" },
    { key: "Conversational", value: "Conversational", text: "Conversational" },
    { key: "Fluent", value: "Fluent", text: "Fluent" },
    { key: "Native/Bilingual", value: "Native/Bilingual", text: "Native/Bilingual" }
]

export default class Language extends React.Component {
    constructor(props) {
        super(props);
        this.getEditComponet = this.getEditComponet.bind(this);
    }

    getEditComponet(data, handleUpdate, handleCancel) {
        return <EditLanguage
                    language={data}
                    handleUpdate={handleUpdate}
                    handleCancel={handleCancel}
                />;
    }

    render() {
        return (
            <Grid.Row>
                <Grid.Column width={16}>
                    <EditableTable
                        fieldNames={[{ name: "Language", key:"name", width: 5 }, { name: "Level", key:"level", width: 7 }]}
                        rowData={[
                            { id: "0", name: "English", level: "Basic" },
                            { id: "1", name: "C#", level: "Basic" },
                            { id: "3", name: "Chinese", level: "Basic" }
                        ]}
                        getEditComponet={this.getEditComponet}
                    />
                </Grid.Column>
            </Grid.Row>
        )
    }
}

export class EditLanguage extends React.Component {
    constructor(props) {
        super(props);
        const language = props.language ?
            Object.assign({}, props.language)
            : {
                name: "",
                level: ""
            };
        this.state = {
            showEditSection: false,
            newContact: language,
            formErrors: { name: ''},
            formValid: true
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleLeveChange = this.handleLeveChange.bind(this);
        this.setNewValue = this.setNewValue.bind(this);
        this.validateField = this.validateField.bind(this);
    };

    handleNameChange(event) {
        this.setNewValue({ [event.target.name]: event.target.value });
    };

    handleLeveChange(event, { name, value }) {
        this.setNewValue({ [name]: value });
    };

    setNewValue(data) {
        Object.keys(data).forEach(name => {
            this.validateField(name, data[name]);
        })

        let formErrors = this.state.formErrors;
        let formValid = true;
        Object.keys(formErrors).forEach(field => {
            if (formErrors[field] !== '') {
                formValid = false;
            }
        });
        this.setState({
            newContact: Object.assign({}, this.state.newContact, data),
            formErrors: formErrors,
            formValid: formValid
        });
    };

    validateField(fieldName, value) {
        let formErrors = this.state.formErrors;
        let fieldValid;
        switch (fieldName) {
            case 'name':
                fieldValid = value !== "";
                formErrors.name = fieldValid ? '' : 'name is required';
                break;
            default:
                break;
        }
    };

    render() {
        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={5}>
                        <SingleInput
                            isError={this.state.formErrors.name!=""}
                            inputType="text"
                            placeholder="Enter language name"
                            name="name"
                            content={this.state.newContact.name}
                            controlFunc={this.handleNameChange}
                            errorMessage={this.state.formErrors.name}
                        />
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Dropdown
                            fluid
                            selection
                            name="level"
                            search={true}
                            options={languageLevels}
                            onChange={this.handleLeveChange}
                            value={this.state.newContact.level}
                            placeholder="Select language level"
                            onFocus={e => { e.target.setAttribute("autocomplete", "nope"); }}
                        />
                    </Grid.Column>
                    <Grid.Column width={5}>
                        <Button
                            basic
                            compact
                            color='blue'
                            disabled={!this.state.formValid}
                            onClick={e => {
                                e.preventDefault();
                                this.props.handleUpdate(this.state.newContact);
                            }}
                        >
                            Update
                        </Button>
                        <Button
                            basic
                            compact
                            color='red'
                            onClick={e => this.props.handleCancel()}
                        >
                            Cancel
                        </Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

EditLanguage.propTypes = {
    language: PropTypes.object.isRequired,      // {id:"id",name:"name",level:"level"}
    handleUpdate: PropTypes.func.isRequired,    // (data:"Object")
    handleCancel: PropTypes.func.isRequired,    // ()
};