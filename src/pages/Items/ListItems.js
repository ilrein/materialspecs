import React from 'react';
import { connect } from 'react-redux';
import { Icon, Table } from 'semantic-ui-react';

const ListItems = ({ items }) => (
  <>
    <Table celled striped stackable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>
            Items
          </Table.HeaderCell>
          <Table.HeaderCell>
            Description
          </Table.HeaderCell>
          <Table.HeaderCell>
            Manufacturer
          </Table.HeaderCell>
          <Table.HeaderCell>
            Supplier
          </Table.HeaderCell>
          <Table.HeaderCell>
            Finish
          </Table.HeaderCell>
          <Table.HeaderCell>
            Price
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {
          items.docs.map(item => (
            <Table.Row>
              <Table.Cell collapsing>
                {item.product}
              </Table.Cell>
              <Table.Cell collapsing>
                {item.description}
              </Table.Cell>
              <Table.Cell collapsing>
                {item.manufacturerName}
                <br />
                {item.manufacturerAddress}
                <br />
                {item.manufacturerPhone}
              </Table.Cell>
              <Table.Cell collapsing>
                {item.supplierName}
                <br />
                {item.supplierAddress}
                <br />
                {item.supplierPhone}
              </Table.Cell>
              <Table.Cell collapsing>
                {item.finish}
              </Table.Cell>
              <Table.Cell collapsing>
                {item.price}
              </Table.Cell>
            </Table.Row>
          ))
        }
      </Table.Body>
    </Table>
  </>
);

ListItems.defaultProps = {
  items: {
    docs: [],
  },
};

export default connect(
  ({ items }) => ({ items }),
)(ListItems);
