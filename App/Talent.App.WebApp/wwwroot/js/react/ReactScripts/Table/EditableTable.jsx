import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';

export class EditableTable extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <Table celled striped>
                <Table.Header>
                    <Table.Row>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    
                </Table.Body>
            </Table>
        )
    };
}