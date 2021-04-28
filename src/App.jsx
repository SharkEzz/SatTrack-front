import React, { useState, useEffect, useCallback } from 'react'
import TopNavbar from './Components/TopNavbar';
import { Card, Row, Container, Form, Col, Button, Badge, Table, InputGroup } from 'react-bootstrap';
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
        {/* TODO : dégager ça et faire un refresh toutes les x secondes à la place ? */}
        <Row className="justify-content-between align-items-center px-3 mb-3">
          <span>Satellite selectionné:<Badge className="ml-2" variant="secondary">{currentTracking?.name ?? "Aucun"}</Badge></span>
          <Button onClick={handleRefreshCurrentTracking}>&#128472;</Button>
        </Row>
        <Row md={12}>
          <Col>
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
                  <Form.Label htmlFor="satSelect">Satellites visibles</Form.Label>
                  <Form.Control id="satSelect" name="satSelect" as="select" defaultValue={currentTracking?.id}>
                    {satellites.map((sat) => (
                      <option key={sat.id} value={sat.id}>{sat.name}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
                  
                <Row>
                  <Col md={4} sm={12}>
                    <Form.Group>
                      <Form.Label htmlFor="lat">Latitude actuelle</Form.Label>
                      <Form.Control type="number" step=".0001" id="lat" name="lat" placeholder="latitude" defaultValue={currentLocation?.lat ?? selectedPosition?.lat}></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={4} sm={12}>
                    <Form.Group>
                      <Form.Label htmlFor="lng">Longitude actuelle</Form.Label>
                      <Form.Control type="number" step=".0001" id="lng" name="lng" placeholder="longitude" defaultValue={currentLocation?.lng ?? selectedPosition?.lng}></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={4} sm={12}>
                    <Form.Group>
                      <Form.Label htmlFor="elev">Altitude actuelle</Form.Label>
                      <InputGroup>
                        <Form.Control type="number" step=".00000000001" id="elev" name="elev" placeholder="elevation" defaultValue={selectedPosition?.alt}></Form.Control>
                        <InputGroup.Append>
                          <InputGroup.Text>mètres</InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>

                    </Form.Group>
                  </Col>
                </Row>
                
                <Row>
                  {/* TODO : Le bouton "lancer suivi" devient arrêter suivi si le suivi est lancé et inversement */}
                  <Button type="submit" className="mt-3 mx-auto" variant="success">Lancer suivi</Button>
                  <Button type="submit" className="mt-3 mx-auto" variant="danger">Arrêter suivi</Button>
                </Row>
              </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={4} sm={12}>
            <Card className="mb-3">
              <Card.Header>
                Satellite suivi : <Badge variant="success">NOAA 19</Badge>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col>
                    {/* TODO : Changer la couleur du badge en fonction de l'élévation, plus visible -> vert sinon rouge */}
                    <p>Elevation : <Badge variant="primary">4.888°</Badge></p>
                  </Col>
                  <Col>
                    <p>Azimuth : <Badge variant="secondary">4.888°</Badge></p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p>Altitude : <Badge variant="info">800 Km</Badge></p>
                  </Col>
                  <Col>
                    <p>Vélocité : <Badge variant="warning">400 Km/h</Badge></p>
                  </Col>
                  {/* TODO : mettre un cercle avec la position du satellite caractérisé par un point ? Permet de voir si le tracking de l'antenne à du sens */}
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col md={8} sm={12}>
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
          </Col>
        </Row>
      </Container>
    </>
    

  )
}

export default App
