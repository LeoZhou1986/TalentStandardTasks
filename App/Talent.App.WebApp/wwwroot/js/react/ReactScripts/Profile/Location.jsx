import React from 'react'
import Cookies from 'js-cookie'
import { default as Countries } from '../../../../util/jsonFiles/countries.json';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Select } from '../Form/Select.jsx';
import { Grid, Button, Dropdown, Popup } from 'semantic-ui-react';

export class Address extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showEditSection: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleCountryChange = this.handleCountryChange.bind(this);
    };

    getCities(country) {
        if (!Array.isArray(Countries.country)) return [];
        let cities = [];
        Countries.country.map((index, value) => {
            cities.push({ key: value, value: value, text: value });
        });
        return cities;
    }

    handleCountryChange(data) {
    }

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
                fieldValid = value === "" ? true : value.match(/^https:\/\/www.linkedin.com\/*/i);
                fieldValidationErrors.linkedIn = fieldValid ? '' : 'LinkedIn URL is invalid';
                break;
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

        let countries = [];
        Object.keys(Countries).map((key, index) => {
            countries.push({ value: key, title: key });
        });
        console.log("countries:", countries);

        return (
            <Grid.Row>
                <Grid.Column width={16}>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={4}>
                                <ChildSingleInput
                                    inputType="text"
                                    label="Number"
                                    name="number"
                                    placeholder="Street number"
                                    value={this.state.newContact.number}
                                    isError={this.state.formErrors.number !== ""}
                                    errorMessage={this.state.formErrors.number}
                                    controlFunc={this.handleChange}
                                />
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <ChildSingleInput
                                    inputType="text"
                                    label="Street"
                                    name="street"
                                    placeholder="Street name"
                                    value={this.state.newContact.street}
                                    isError={this.state.formErrors.street !== ""}
                                    errorMessage={this.state.formErrors.street}
                                    controlFunc={this.handleChange}
                                />
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <ChildSingleInput
                                    inputType="text"
                                    label="Suburb"
                                    name="suburb"
                                    placeholder="Suburb"
                                    value={this.state.newContact.suburb}
                                    isError={this.state.formErrors.suburb !== ""}
                                    errorMessage={this.state.formErrors.suburb}
                                    controlFunc={this.handleChange}
                                />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={6}>
                                <div className="field">
                                    <label>Country</label>
                                    <Select
                                        name="Country"
                                        options={countries}
                                        controlFunc={this.handleCountryChange}
                                        />
                                </div>
                            </Grid.Column>
                            <Grid.Column width={6}>

                            </Grid.Column>
                            <Grid.Column width={4}>
                                <ChildSingleInput
                                    inputType="text"
                                    label="Post Code"
                                    name="postCode"
                                    placeholder="Post Code"
                                    value={this.state.newContact.postCode}
                                    isError={this.state.formErrors.postCode !== ""}
                                    errorMessage={this.state.formErrors.postCode}
                                    controlFunc={this.handleChange}
                                />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
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
                        </Grid.Row>
                    </Grid>
                    
                </Grid.Column>
            </Grid.Row>
        )
    };

    renderDisplay() {
        let address, city, country;
        if (this.props.address) {
            let data = this.props.address;
            address = `${data.number}, ${data.street}, ${data.suburb}, ${data.postCode}`;
            city = this.props.address.city;
            country = this.props.address.country;
        } else {
            address = city = country = "";
        }
        return (
            <Grid.Row>
                <Grid.Column width={16}>
                    <React.Fragment>
                        <p>Address: {address}</p>
                        <p>City: {city}</p>
                        <p>Country: {country}</p>
                    </React.Fragment>
                    <Button color='teal' floated='right' onClick={e => {
                        e.preventDefault();
                        this.setState({
                            showEditSection: true,
                            newContact: Object.assign({}, this.props.address),
                            formErrors: {
                                number: "",
                                street: "",
                                suburb: "",
                                postCode: "",
                                city: "",
                                country: ""
                            },
                            formValid: true
                        })
                    }}>
                        Edit
                    </Button>
                </Grid.Column>
            </Grid.Row>
        )
    };
}

export class Nationality extends React.Component {
    constructor(props) {
        super(props)
       
    }

    
    render() {
        return (
            <div></div>
        )
    }
}