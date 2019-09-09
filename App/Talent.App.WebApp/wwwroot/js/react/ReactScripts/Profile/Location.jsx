import React from 'react'
import { default as Countries } from '../../../../util/jsonFiles/countries.json';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { ChildSelect } from '../Form/Select.jsx';
import { Grid, Button } from 'semantic-ui-react';

export class Address extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showEditSection: false
        };
        this.setNewValue = this.setNewValue.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCountryChange = this.handleCountryChange.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.saveContact = this.saveContact.bind(this);
    };

    getCities(country) {
        if (!Array.isArray(Countries[country])) return [];
        let cities = [];
        Countries[country].map(value => {
            cities.push({ key: value, value: value, text: value });
        });
        return cities;
    };

    handleCountryChange(e, { value }) {
        this.setNewValue({ country: value, city:"" });
    };

    handleCityChange(e, { value }) {
        this.setNewValue({ city: value });
    };

    handleInputChange(event) {
        const name = event.target.name;
        const value = event.target.value;
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
            case 'postCode':
                fieldValid = value === "" ? true : (/^\d*$/i).test(value);
                formErrors.postCode = fieldValid ? '' : 'PostCode is invalid';
                break;
            default:
                break;
        }
    };

    saveContact(e) {
        e.preventDefault();
        console.log("Location newContact:", this.state.newContact);
    };

    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    };

    renderEdit() {

        let countries = [];
        Object.keys(Countries).map((key, index) => {
            countries.push({ key:key, value: key, text: key });
        });
        console.log("Location state:", this.state);

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
                                    controlFunc={this.handleInputChange}
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
                                    controlFunc={this.handleInputChange}
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
                                    controlFunc={this.handleInputChange}
                                />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={6}>
                                <ChildSelect
                                    name="Country"
                                    options={countries}
                                    handleChange={this.handleCountryChange}
                                    value={this.state.newContact.country}
                                    placeholder="Country"
                                />
                            </Grid.Column>
                            <Grid.Column width={6}>
                                <ChildSelect
                                    name="City"
                                    options={this.getCities(this.state.newContact.country)}
                                    handleChange={this.handleCityChange}
                                    value={this.state.newContact.city}
                                    placeholder="City"
                                />
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
                                    controlFunc={this.handleInputChange}
                                />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={16}>
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
                            </Grid.Column>
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
                        this.setState({
                            showEditSection: true,
                            newContact: Object.assign({}, this.props.addressData),
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