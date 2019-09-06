import React from 'react'
import Cookies from 'js-cookie'
import { default as Countries } from '../../../../util/jsonFiles/countries.json';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Select } from '../Form/Select.jsx';
import { Grid, Button, Icon, Popup } from 'semantic-ui-react';

export class Address extends React.Component {
    constructor(props) {
        super(props)
        //Countries.map()
        this.state = {
            showEditSection: false,
            newContact: {},
            formErrors: { linkedIn: '', github: '' },
            formValid: false
        };
    };
   
    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    };

    renderEdit() {
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
                                <Select
                                    name="Country"
                                />
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
                    </Grid>
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