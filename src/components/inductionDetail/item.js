import React from 'react';
import { Table } from 'semantic-ui-react';

const item = (props) => {
  return (
    <Table striped celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Şehir</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>{props.id.city.name}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

export default item;
