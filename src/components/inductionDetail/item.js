import React from 'react';
import { Table } from 'semantic-ui-react';

const item = (props) => {
  return (
    <Table striped celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>{props.id.city.name}</Table.HeaderCell>
          <Table.HeaderCell>Toplam Hekim</Table.HeaderCell>
          <Table.HeaderCell>Hekim Coğrafi Dağılım</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {props.id.departments.map((d) => {
          return (
            <Table.Row key={d.id}>
              <Table.Cell>{d.name}</Table.Cell>
              <Table.Cell>{d.cityPhysician}</Table.Cell>
              <Table.Cell>{d.cityPhysicianScoped}</Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};

export default item;
