import React, { useState } from 'react';
import { Card, Button, Table, Modal, FormControl, Badge } from 'react-bootstrap';
import PropTypes from 'prop-types';

const SatellitesView = ({ satellites }) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);

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
                    <Button onClick={() => setEditModalOpen(true)} className="mr-2" variant="info" size="sm">
                      Edit TLE
                    </Button>
                    <Button variant="danger" size="sm">
                      Delete
                    </Button>
                  </td>
                </tr> 
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={editModalOpen} onHide={() => setEditModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit TLE: <Badge variant="info">Nom sat</Badge></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl as="textarea" rows={3}></FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success">Confirm</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={addModalOpen} onHide={() => setAddModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add TLE</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl as="textarea" rows={3}></FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success">Confirm</Button>
        </Modal.Footer>
      </Modal>
    </>
    
  )
};

SatellitesView.propTypes = {
  satellites: PropTypes.array.isRequired
}

export default SatellitesView;
