import React from 'react';
import { Card, Row, Container, Col, Button, Badge, Table, InputGroup, Form } from 'react-bootstrap';

const SatellitesView = ({satellites}) => {

    return (
        
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
                    <Button className="mr-2" variant="info" size="sm">
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
    )
};

export default SatellitesView;
