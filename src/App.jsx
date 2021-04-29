import React, { useCallback, useEffect } from 'react'
import { Row, Container, Col } from 'react-bootstrap';
import useSatellites from './Hooks/useSatellites';
import { TrackingForm, TrackingView, TopNavbar, SatellitesView } from './Components/';

let refreshTrackingInterval = null;

function App() {

  const {
    // Attributes
    currentTracking,
    visibleSatellites,
    satellites,

    // Methods
    getUserGeolocation,
    refreshVisibleSatellites,
    refreshCurrentTracking,
    editTracking,
    editCurrentTracking,
    editSatellite,
    deleteSatellite,
    addSatellite
  } = useSatellites();

  const setTrackingAutoRefresh = useCallback((enabled) => {
    if(enabled)
    {
      refreshTrackingInterval = setInterval(() => {
        if(currentTracking)
          refreshCurrentTracking();
        refreshVisibleSatellites();
      }, 5000);
    }
    else
    {
      clearInterval(refreshTrackingInterval);
      refreshTrackingInterval = null;
    }
  }, [currentTracking, refreshCurrentTracking, refreshVisibleSatellites]);

  useEffect(() => {
    setTrackingAutoRefresh(true);

    return () => setTrackingAutoRefresh(false);
  }, [setTrackingAutoRefresh])

  return (
    <>
      <TopNavbar />
      <Container className="mt-3">
        <Row md={12}>
          <Col>
            <TrackingForm 
              satellites={visibleSatellites} 
              isTracking={Boolean(currentTracking)}
              getUserGeolocation={getUserGeolocation}
              onStopTracking={() => editCurrentTracking(null)}
              onSubmit={editTracking}
              />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={4} sm={12}>
            {currentTracking ? <TrackingView currentTracking={currentTracking} /> : <p>No tracking</p>}
          </Col>
          <Col md={8} sm={12}>
            <SatellitesView 
              satellites={satellites} 
              editSatellite={editSatellite} 
              deleteSatellite={deleteSatellite}
              addSatellite={addSatellite}
              />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App
