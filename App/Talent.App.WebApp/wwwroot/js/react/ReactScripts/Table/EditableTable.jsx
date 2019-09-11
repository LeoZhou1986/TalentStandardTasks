import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Icon, Divider } from 'semantic-ui-react';

export class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editRow: -1,
            addNew: false
        };
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleCancelEdit = this.handleCancelEdit.bind(this);
    };

    handleEdit(index) {
        console.log("Edit: ", index);
        if (index != this.state.editRow) {
            this.setState({ editRow: index });
        }
    };

    handleUpdate(data) {
        console.log("Update: ", data);
    };

    handleCancelEdit() {
        this.setState({ editRow: -1 });
    };

    handleDelete(data) {
        console.log("Delete: ", data);
    };

    render() {
        return (
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
                                    {this.props.getEditComponet(data, this.handleUpdate, this.handleCancelEdit)}
                                </Table.Cell>
                            </Table.Row>
                        } else {
                            row =
                            <Table.Row key={index}>
                                {this.props.fieldNames.map(column =>
                                    <Table.Cell key={column.key}>{data[column.key]}</Table.Cell>
                                )}
                                <Table.Cell textAlign='right'>
                                    <Icon name='pencil' onClick={() => this.handleEdit(index)} />
                                    <Icon name='x' onClick={() => this.handleDelete(data)} />
                                </Table.Cell>
                            </Table.Row>
                        }
                        return row;
                    })}
                </Table.Body>
            </Table>
        )
    };
}

EditableTable.propTypes = {
    fieldNames: PropTypes.array.isRequired, // [{name:"columnName",width:"columnWidth"}]
    rowData: PropTypes.array.isRequired, // [{columnName:"value",id:"id"}]
    getEditComponet: PropTypes.func.isRequired
};