import React from 'react';
import { Card, Row, Col, Badge } from 'react-bootstrap';
import SatelliteSight from './SatelliteSight';

const TrackingView = ({currentTracking}) => {

    return (
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
            <Row>
              <Col>
                <SatelliteSight azimuth={203.62} elevation={29.09} />
              </Col>
            </Row>
          </Card.Body>
        </Card>
    )
}

export default TrackingView;
