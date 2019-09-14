import React from 'react';
import PropTypes from 'prop-types';

export const SingleInput = (props) => {
    let label = props.title ? <label>{props.title}</label> : null;
    return <div className={`field ${props.isError == true ? 'error' : ''} `}>
        {label}
        <input
            type={props.inputType}
            placeholder={props.placeholder}
            name={props.name}
            value={props.content}
            onChange={props.controlFunc} />
        {props.isError ? <div className="ui basic red pointing prompt label transition visible">{props.errorMessage}</div> : null}
    </div>
}
    

SingleInput.propTypes = {
    inputType: PropTypes.oneOf(['text', 'number', 'password', 'date']).isRequired,
    errorMessage: PropTypes.string.isRequired,
    title: PropTypes.string,
    name: PropTypes.string.isRequired,
    controlFunc: PropTypes.func.isRequired,
    content: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.instanceOf(Date)
    ]),
    placeholder: PropTypes.string,
    isError: PropTypes.bool.isRequired
}

//Updates state in parent component
export class ChildSingleInput extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div className={`field ${this.props.isError == true ? 'error' : ''} `}>
                <label>{this.props.label}</label>
                <input
                    type={this.props.inputType}
                    name={this.props.name}
                    value={this.props.value ? this.props.value : ""}
                    placeholder={this.props.placeholder}
                    maxLength={this.props.maxLength}
                    onChange={this.props.controlFunc}
                />
                {this.props.isError ? <div className="ui basic red pointing prompt label transition visible">{this.props.errorMessage}</div> : null}
            </div>
        )

    }
}

ChildSingleInput.propTypes = {
    inputType: PropTypes.oneOf(['text', 'number', 'password']).isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    placeholder: PropTypes.string,
    controlFunc: PropTypes.func.isRequired,
    isError: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired
}


export class CharactersRemaining extends React.Component {
    render() {
        let characters = this.props.characters ? this.props.characters.length : 0
        return (
            <div className="floatRight" >Word count : {characters} / {this.props.maxLength}</div>
        )
    }
}