import React, { useCallback } from 'react'
import { Row, Container, Col } from 'react-bootstrap';
import useSatellites from './Hooks/useSatellites';
import { TrackingForm, TrackingView, TopNavbar, SatellitesView } from './Components/';

let refreshTrackingInterval = null;

function App() {

  const {
    // Attributes
    currentTracking,
    visibleSatellites,
    currentLocation,
    savedPosition,
    isTracking,
    isLoaded,
    satellites,

    // Methods
    getUserGeolocation,
    refreshVisibleSatellites,
    refreshSelectedPosition,
    refreshCurrentTracking,
    setIsTracking,
    editTracking,
    editCurrentTracking
  } = useSatellites();

  const setTrackingAutoRefresh = (enabled = false) => {
    if(enabled && refreshTrackingInterval === null)
    {
      setIsTracking(true);
      refreshTrackingInterval = setInterval(() => {
        refreshCurrentTracking();
      }, 5000);
    }
    else if(enabled === false && refreshTrackingInterval !== null)
    {
      setIsTracking(false);
      clearInterval(refreshTrackingInterval);
      refreshTrackingInterval = null;
      editCurrentTracking(null);
    }
  };

  return (
    <>
      <TopNavbar />
      <Container className="mt-3">
        <Row md={12}>
          <Col>
            <TrackingForm 
              satellites={visibleSatellites} 
              isTracking={isTracking}
              getUserGeolocation={getUserGeolocation}
              onSubmit={editTracking}
              setTrackingAutoRefresh={setTrackingAutoRefresh}
              />
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
