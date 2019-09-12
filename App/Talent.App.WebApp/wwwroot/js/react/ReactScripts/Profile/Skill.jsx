/* Skill section */
import React from 'react';
import Cookies from 'js-cookie';
import { EditableTable } from '../Table/EditableTable.jsx';
import { SingleInput } from '../Form/SingleInput.jsx';
import { Grid, Dropdown, Button } from 'semantic-ui-react';

const skillLevels = [
    { key: "Beginner", value: "Beginner", text: "Beginner" },
    { key: "Intermediate", value: "Intermediate", text: "Intermediate" },
    { key: "Expert", value: "Expert", text: "Expert" }
]

export default class Skill extends React.Component {
    constructor(props) {
        super(props);
        this.getAddComponent = this.getAddComponent.bind(this);
        this.getEditComponent = this.getEditComponent.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    };

    getAddComponent(handleAdd, handleCancel) {
        return <EditSkill
            handleConfirm={handleAdd}
            handleCancel={handleCancel}
        />
    };

    getEditComponent(data, handleUpdate, handleCancel) {
        return <EditSkill
            contact={data}
            handleConfirm={handleUpdate}
            handleCancel={handleCancel}
        />;
    };

    handleAdd(data) {
        console.log("Add: ", data);
    };

    handleDelete(data) {
        console.log("Delete: ", data);
    };

    handleUpdate(data) {
        console.log("Update: ", data);
    };
  
   render() {
       return (
           <Grid.Row>
               <Grid.Column width={16}>
                   <EditableTable
                       fieldNames={[{ name: "Skill", key: "name", width: 5 }, { name: "Level", key: "level", width: 7 }]}
                       rowData={[
                           { id: "0", name: "C#", level: "Beginner" },
                           { id: "1", name: "PHP", level: "Beginner" },
                           { id: "2", name: "ActionSprite", level: "Expert" }
                       ]}
                       getAddComponent={this.getAddComponent}
                       getEditComponent={this.getEditComponent}
                       handleAdd={this.handleAdd}
                       handleDelete={this.handleDelete}
                       handleUpdate={this.handleUpdate}
                   />
               </Grid.Column>
           </Grid.Row>
       )
    }
}

export class EditSkill extends React.Component {
    constructor(props) {
        super(props);
        let newContact, isEdit, levelError;
        console.log(props.contact);
        if (props.contact) {
            newContact = Object.assign({}, props.contact);
            isEdit = true;
            levelError = "";
        } else {
            newContact = { name: "", level: "" };
            isEdit = false;
            levelError = "level is required";
        }
        this.state = {
            isEdit: isEdit,
            newContact: newContact,
            formErrors: { name: "", level: levelError },
            formValid: isEdit
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.setNewValue = this.setNewValue.bind(this);
        this.validateField = this.validateField.bind(this);
        console.log(this.state);
    };

    handleInputChange(event) {
        this.setNewValue({ [event.target.name]: event.target.value });
    };

    handleSelectChange(event, { name, value }) {
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
            case "level":
                fieldValid = value !== "";
                formErrors.level = fieldValid ? '' : 'level is required';
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
                            isError={this.state.formErrors.name != ""}
                            inputType="text"
                            placeholder="Enter skill name"
                            name="name"
                            content={this.state.newContact.name}
                            controlFunc={this.handleInputChange}
                            errorMessage={this.state.formErrors.name}
                        />
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Dropdown
                            fluid
                            selection
                            name="level"
                            search={true}
                            options={skillLevels}
                            onChange={this.handleSelectChange}
                            value={this.state.newContact.level}
                            placeholder="Select skill level"
                            onFocus={e => { e.target.setAttribute("autocomplete", "nope"); }}
                        />
                    </Grid.Column>
                    <Grid.Column width={5}>
                        <Button
                            basic={this.state.isEdit ? true : false}
                            compact
                            color={this.state.isEdit ? "blue" : "teal"}
                            disabled={!this.state.formValid}
                            onClick={e => {
                                e.preventDefault();
                                this.props.handleConfirm(this.state.newContact);
                            }}
                        >
                            {this.state.isEdit ? "Update" : "Add"}
                        </Button>
                        <Button
                            basic={this.state.isEdit ? true : false}
                            compact
                            color={this.state.isEdit ? "red" : null}
                            onClick={e => {
                                e.preventDefault();
                                this.props.handleCancel()
                            }}
                        >
                            Cancel
                        </Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}