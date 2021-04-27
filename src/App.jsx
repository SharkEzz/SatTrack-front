import React, { useState, useEffect, useCallback } from 'react'
import TopNavbar from './Components/TopNavbar';
import { Card, Row, Container, Form, Col, Button, Badge } from 'react-bootstrap';
import fetchSatellites from './Services/Fetch/fetchSatellites';

function App() {

  const [currentTracking, setCurrentTracking] = useState();
  const [satellites, setSatellites] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState();
  const [currentLocation, setCurrentLocation] = useState();

  const getUserGeolocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { coords } = pos;
      setCurrentLocation({
        lat: coords.latitude.toFixed(4),
        lng: coords.longitude.toFixed(4)
      });
    });
  }, []);

  const handleRefreshVisibleSatellites = useCallback(() => {
    return fetchSatellites
      .getVisibleSatellites()
      .then((sats) => setSatellites(sats));
  }, []);

  const handleRefreshSelectedPosition = useCallback(() => {
    return fetchSatellites
      .getCurrentSelectedPosition()
      .then((pos) => setSelectedPosition(pos));
  }, []);

  const handleRefreshCurrentTracking = useCallback(() => {
    return fetchSatellites
      .getCurrentTracking()
      .then((sat) => setCurrentTracking(sat));
  }, []);

  useEffect(() => {
    handleRefreshVisibleSatellites();
    handleRefreshSelectedPosition();
    handleRefreshCurrentTracking();
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    const formData = new FormData(e.currentTarget);
    const data = Array.from(formData);
    const obj = data.reduce((a, b) => ({...a, [b[0]]: b[1]}), {[data[0][0]]: data[0][1]});
    console.log(obj);
  }, []);

  return (
    <>
      <TopNavbar />
      <Container className="mt-3">
        <Row className="justify-content-between align-items-center px-3 mb-3">
          <span>Satellite selectionné:<Badge className="ml-2" variant="secondary">{currentTracking?.name ?? "Aucun"}</Badge></span>
          <Button onClick={handleRefreshCurrentTracking}>&#128472;</Button>
        </Row>
        <Row md={12}>
          <Card className="w-100">
            <Card.Header>
              <Row className="justify-content-between align-items-center px-3">
                <span>Selection satellite</span>
                <Button variant="primary" size="sm" onClick={getUserGeolocation}>Me géolocaliser</Button>  
              </Row>
            </Card.Header>
            <Card.Body>
            
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label htmlFor="satSelect">Selection satellite:</Form.Label>
                <Form.Control id="satSelect" name="satSelect" as="select" defaultValue={currentTracking?.id}>
                  {satellites.map((sat) => (
                    <option key={sat.id} value={sat.id}>{sat.name}</option>
                  ))}
                </Form.Control>
              </Form.Group>
                
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label htmlFor="lat">Latitude</Form.Label>
                    <Form.Control type="number" step=".00000000001" id="lat" name="lat" placeholder="latitude" defaultValue={currentLocation?.lat ?? selectedPosition?.lat}></Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label htmlFor="lng">Longitude</Form.Label>
                    <Form.Control type="number" step=".00000000001" id="lng" name="lng" placeholder="longitude" defaultValue={currentLocation?.lng ?? selectedPosition?.lng}></Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label htmlFor="elev">Élevation</Form.Label>
                    <Form.Control type="number" step=".00000000001" id="elev" name="elev" placeholder="elevation" defaultValue={selectedPosition?.alt}></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              
              <Button type="submit" className="mt-3" variant="success">Valider</Button>
            </Form>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </>
    

  )
}

export default App
