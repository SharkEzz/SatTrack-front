import React from 'react'
import { Row, Container, Col } from 'react-bootstrap';
import useSatellites from './Hooks/useSatellites';
import { TrackingForm, TrackingView, TopNavbar, SatellitesView } from './Components/';

function App() {

  const {
    // Attributes
    currentTracking,
    satellites,
    currentLocation,
    savedPosition,
    isTracking,
    isLoaded,

    // Methods
    getUserGeolocation,
    refreshVisibleSatellites,
    refreshSelectedPosition,
    refreshCurrentTracking
  } = useSatellites();

  return (
    <>
      <TopNavbar />
      <Container className="mt-3">
        <Row md={12}>
          <Col>
            <TrackingForm 
              satellites={satellites} 
              isTracking={isTracking}
              getUserGeolocation={getUserGeolocation}
              onSubmit={() => Promise.resolve() /* TODO */} />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={4} sm={12}>
            {currentTracking ? <TrackingView currentTracking={currentTracking} /> : <p>No tracking</p>}
          </Col>
          <Col md={8} sm={12}>
            <SatellitesView satellites={satellites} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App
