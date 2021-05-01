import React, { useState } from 'react';
import {
  Container, Row, Col, Button, Badge, Modal, ModalFooter,
} from 'react-bootstrap';
import {
  LocationForm,
  SatellitesTable,
  TrackingForm,
  TrackingView,
  TopNavbar,
  ConnectForm,
} from './Components';
import useApp from './Hooks/useApp';

function App() {
  const {
    isConnected, serverInfos, currentLocation, setIsConnected, setServerInfos, setCurrentLocation,
  } = useApp();
  const [locationModalOpened, setLocationModalOpened] = useState(false);
  const [serverInfosModalOpened, setServerInfosModalOpened] = useState(false);

  return (
    <>
      <TopNavbar />
      <Container className="mt-3">
        <Row className="mb-3">
          <Col>
            <Button onClick={() => setLocationModalOpened(true)}>Edit current location</Button>
          </Col>
          <Col className="text-right">
            <Button onClick={() => setServerInfosModalOpened(true)} variant="secondary">
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

      <Modal show={locationModalOpened} onHide={() => setLocationModalOpened(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit current location</Modal.Title>
        </Modal.Header>
        <LocationForm
          currentLocation={currentLocation}
          setCurrentLocation={setCurrentLocation}
          BodyWrapper={Modal.Body}
          FooterWrapper={Modal.Footer}
        />
      </Modal>

      <Modal show={serverInfosModalOpened} onHide={() => setServerInfosModalOpened(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit server infos</Modal.Title>
        </Modal.Header>
        <ConnectForm
          isConnected={isConnected}
          serverInfos={serverInfos}
          setIsConnected={setIsConnected}
          setServerInfos={setServerInfos}
          modalOpened={setServerInfosModalOpened}
          BodyWrapper={Modal.Body}
          FooterWrapper={Modal.Footer}
        />
      </Modal>
    </>
  );
}

export default App;
