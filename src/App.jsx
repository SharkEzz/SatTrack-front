import React from 'react';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';
import {
  LocationForm,
  SatellitesTable,
  TrackingForm,
  TrackingView,
  TopNavbar,
  ConnectForm
} from './Components';

function App() {
  return (
    <>
      <TopNavbar />
      <Container className="mt-3">
        <Row className="mb-3">
          <Col>
            <Button>Edit current location</Button>
          </Col>
          <Col className="text-right">
            <Button variant="secondary">
              Edit server connection&nbsp;
              <Badge pill variant="danger">&nbsp;</Badge>
            </Button>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <TrackingForm />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={5} sm={12}>
            <TrackingView />
          </Col>
          <Col md={7} sm={12}>
            <SatellitesTable />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
