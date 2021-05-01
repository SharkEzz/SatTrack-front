import React from 'react';
import PropTypes from 'prop-types';
import { Table, Card, Button } from 'react-bootstrap';

const SatellitesTable = ({ satellites }) => (
  <Card>
    <Card.Header>Added satellites</Card.Header>
    <Card.Body>
      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {satellites.map((satellite) => (
            <tr>
              <td>{satellite.name}</td>
              <td>
                <Button className="m-1" variant="secondary" size="sm">Edit</Button>
                <Button className="m-1" variant="danger" size="sm">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>

      </Table>
    </Card.Body>
  </Card>
);

SatellitesTable.propTypes = {
  satellites: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired),
};

SatellitesTable.defaultProps = {
  satellites: [],
};

export default SatellitesTable;
