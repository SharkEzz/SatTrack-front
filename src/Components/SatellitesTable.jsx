import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Table, Card, Button, Modal,
} from 'react-bootstrap';

const SatellitesTable = ({
  satellites, addSatellite, updateSatellite, deleteSatellite,
}) => {
  const [editModalOpened, setEditModalOpened] = useState(false);
  const [tle, setTle] = useState('');
  const [editSatelliteId, setEditSatelliteId] = useState();
  const [addModalOpened, setAddModalOpened] = useState(false);

  // TODO: optimize this

  const onAddSatellite = useCallback(() => {
    addSatellite(tle);
  }, [addSatellite, tle]);

  const onEditSatellite = useCallback(() => {
    updateSatellite(editSatelliteId, tle);
  }, [updateSatellite, tle, editSatelliteId]);

  return (
    <>
      <Card>
        <Card.Header className="d-flex align-items-center justify-content-between">
          Added satellites
          <Button size="sm" onClick={() => setAddModalOpened(true)}>+</Button>
        </Card.Header>
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
                <tr key={satellite.id}>
                  <td>{satellite.name}</td>
                  <td>
                    <Button
                      className="m-1"
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        setTle(satellite.tle);
                        setEditSatelliteId(satellite.id);
                        setEditModalOpened(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button className="m-1" variant="danger" size="sm" onClick={() => deleteSatellite(satellite.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={editModalOpened} onHide={() => setEditModalOpened(false)}>
        <Modal.Header closeButton>Edit satellite</Modal.Header>
        <Modal.Body>
          <h6>TLE</h6>
          <textarea className="form-control" rows="3" value={tle} onInput={(e) => setTle(e.target.value)} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => onEditSatellite()}>Edit</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={addModalOpened} onHide={() => setAddModalOpened(false)}>
        <Modal.Header closeButton>Add satellite</Modal.Header>
        <Modal.Body>
          <h6>TLE</h6>
          <textarea className="form-control" rows="3" value={tle} onInput={(e) => setTle(e.target.value)} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => onAddSatellite(tle)}>Add</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

SatellitesTable.propTypes = {
  satellites: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired),
  addSatellite: PropTypes.func.isRequired,
  updateSatellite: PropTypes.func.isRequired,
  deleteSatellite: PropTypes.func.isRequired,
};

SatellitesTable.defaultProps = {
  satellites: [],
};

export default SatellitesTable;
