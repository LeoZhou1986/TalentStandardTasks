﻿import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Icon } from 'semantic-ui-react';

export class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editRow: -1,
            addNew: false
        };
        this.handleAdd = this.handleAdd.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleCancelAdd = this.handleCancelAdd.bind(this);
        this.handleCancelEdit = this.handleCancelEdit.bind(this);
    };

    handleAdd(data) {
        console.log("Add: ", data);
        this.handleCancelAdd();
        this.props.handleAdd(data);
    };

    handleDelete(data) {
        console.log("Delete: ", data);
        this.handleCancelEdit();
        this.props.handleDelete(data);
    };

    handleUpdate(data) {
        console.log("Update: ", data);
        this.handleCancelEdit();
        this.props.handleUpdate(data);
    };

    handleCancelAdd() {
        this.setState({ addNew: false });
    };

    handleCancelEdit() {
        this.setState({ editRow: -1 });
    };

    render() {
        let addElement = this.state.addNew ? this.props.getAddComponent(this.handleAdd, this.handleCancelAdd) : null;
        return (
            <div>
                {addElement}
                <Table striped size='small'>
                    <Table.Header>
                        <Table.Row>
                            {this.props.fieldNames.map(column =>
                                <Table.HeaderCell key={column.key} width={column.width}>{column.name}</Table.HeaderCell>
                            )}
                            <Table.HeaderCell width={3} textAlign='center'>
                                <Button
                                    compact
                                    color='teal'
                                    onClick={e => {
                                        e.preventDefault();
                                        this.setState({ addNew: true, editRow: -1 });
                                    }}
                                >
                                    + Add New
                                </Button>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.props.rowData.map((data, index) => {
                            let row;
                            if (index == this.state.editRow) {
                                row =
                                <Table.Row key={index}>
                                    <Table.Cell colSpan={this.props.fieldNames.length + 1}>
                                        {this.props.getEditComponent(data, this.handleUpdate, this.handleCancelEdit)}
                                    </Table.Cell>
                                </Table.Row>
                            } else {
                                row =
                                <Table.Row key={index}>
                                    {this.props.fieldNames.map(column =>
                                        <Table.Cell key={column.key}>{data[column.key]}</Table.Cell>
                                    )}
                                    <Table.Cell textAlign='right'>
                                        <Icon name='pencil' onClick={() => this.setState({ editRow: index, addNew: false})} />
                                        <Icon name='x' onClick={() => this.handleDelete(data)} />
                                    </Table.Cell>
                                </Table.Row>
                            }
                            return row;
                        })}
                    </Table.Body>
                </Table>
            </div>
        )
    };
}

EditableTable.propTypes = {
    fieldNames: PropTypes.arrayOf(function (propValue, key, componentName, location, propFullName) {
        if (typeof propValue[key].name !== "string") return new Error(`Invalid prop '${propFullName}.name' supplied to '${componentName}' . Validation failed.`);
        if (typeof propValue[key].key !== "string") return new Error(`Invalid prop '${propFullName}.key' supplied to '${componentName}' . Validation failed.`);
        if (typeof propValue[key].width !== "number") return new Error(`Invalid prop '${propFullName}.width' supplied to '${componentName}' . Validation failed.`);
    }).isRequired,
    rowData: PropTypes.arrayOf(PropTypes.object).isRequired,        // [{columnName:"value",id:"id"}]
    getAddComponent: PropTypes.func.isRequired,     // (handleAdd:Function(data:Object), handleCancel:Function)
    getEditComponent: PropTypes.func.isRequired,    // (data:Object, handleUpdate:Function(data:Object), handleCancel:Function)
    handleAdd: PropTypes.func.isRequired,           // (data:Object)
    handleDelete: PropTypes.func.isRequired,        // (data:Object)
    handleUpdate: PropTypes.func.isRequired         // (data:Object)
};