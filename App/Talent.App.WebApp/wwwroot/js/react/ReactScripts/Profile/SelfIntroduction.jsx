/* Self introduction section */
import React, { Component } from 'react';
import Cookies from 'js-cookie'
import { Button, Icon, Popup } from 'semantic-ui-react';

export default class SelfIntroduction extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div className='ui sixteen wide column'>
                <div>
                    <input
                        type={this.props.inputType}
                        name='summary'
                        value={this.props.value}
                        placeholder={this.props.placeholder}
                        maxLength={this.props.maxLength}
                        onChange={this.props.controlFunc}
                    />
                    <label>Summary must be no more than 150 characters.</label>
                </div>
                <div>
                    <input
                        type={this.props.inputType}
                        name='summary'
                        value={this.props.value}
                        placeholder={this.props.placeholder}
                        maxLength={this.props.maxLength}
                        onChange={this.props.controlFunc}
                    />
                    <label>Description must be between 150-600 characters.</label>
                </div>
                <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
            </div>
        )
    }
}



