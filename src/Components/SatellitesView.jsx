import React, { useState } from 'react';
import { Card, Button, Table, Modal, FormControl, Badge } from 'react-bootstrap';

const SatellitesView = ({ satellites }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Card className="w-100">
        <Card.Header>
          Tous les satellites
            </Card.Header>
        <Card.Body>
          <Table striped>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Ajouté le</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>OUi</td>
                <td>20/04/2021</td>
                <td>
                  <Button onClick={() => setModalOpen(true)} className="mr-2" variant="info" size="sm">
                    Editer TLE
                  </Button>
                  <Button variant="danger" size="sm">
                    Supprimer
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <Modal show={modalOpen} onHide={() => setModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editer un TLE : <Badge variant="info">Nom sat</Badge></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl as="textarea" rows={3}></FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success">Valider</Button>
        </Modal.Footer>
      </Modal>
    </>
    
  )
};

export default SatellitesView;
