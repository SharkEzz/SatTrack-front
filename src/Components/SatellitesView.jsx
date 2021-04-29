import React, { useState } from 'react';
import { Card, Button, Table, Modal, FormControl, Badge } from 'react-bootstrap';
import PropTypes from 'prop-types';

const SatellitesView = ({ satellites, editSatellite, deleteSatellite, addSatellite }) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const [modalTleText, setModalTleText] = useState();

  return (
    <>
      <Card className="w-100">
        <Card.Header>
          <div className="d-flex justify-content-between align-items-center">
            <span>Added satellites</span>
            <Button onClick={() => setAddModalOpen(true)}>&#43;</Button>
          </div>
        </Card.Header>
        <Card.Body>
          <Table striped>
            <thead>
              <tr>
                <th>Name</th>
                <th>Added at</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {satellites.map((satellite, index) => (
                <tr key={index}>
                  <td>{satellite.name}</td>
                  <td>{satellite.createdAt}</td>
                  <td>
                    <Button onClick={() => setEditModalOpen(satellite.id)} className="mr-2" variant="info" size="sm">
                      Edit TLE
                    </Button>
                    <Button onClick={() => deleteSatellite(satellite.id)} variant="danger" size="sm">
                      Delete
                    </Button>
                  </td>
                </tr> 
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={Boolean(editModalOpen)} onHide={() => setEditModalOpen()}>
        <Modal.Header closeButton>
          <Modal.Title>Edit TLE: <Badge variant="info">{satellites.find(sat => sat.id === editModalOpen)?.name}</Badge></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl as="textarea" rows={3} value={modalTleText} onChange={(e) => setModalTleText(e.target.value)}></FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => editSatellite({id: editModalOpen, tle: modalTleText})}>Confirm</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={addModalOpen} onHide={() => setAddModalOpen()}>
        <Modal.Header closeButton>
          <Modal.Title>Add TLE</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl as="textarea" rows={3} value={modalTleText} onChange={(e) => setModalTleText(e.target.value)}></FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => addSatellite(modalTleText)}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    </>
    
  )
};

SatellitesView.propTypes = {
  satellites: PropTypes.array.isRequired,
  editSatellite: PropTypes.func.isRequired,
  deleteSatellite: PropTypes.func.isRequired,
  addSatellite: PropTypes.func.isRequired
}

export default SatellitesView;
