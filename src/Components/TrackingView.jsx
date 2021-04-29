import React from 'react';
import { Card, Row, Col, Badge } from 'react-bootstrap';
import SatelliteSight from './SatelliteSight';
import PropTypes from 'prop-types';

const TrackingView = ({ currentTracking }) => {

  const getElevationBadgeColorByElevationValue = (elevation) => {
    switch (true) {
      case elevation < 15:
        return 'danger';
      case elevation < 20 && elevation > 15:
        return 'warning';
      case elevation >= 40:
        return 'success';    
      default:
        return 'primary';
    }
  }

  return (
    <Card className="mb-3">
      <Card.Header>
        Tracked satellite : <Badge variant="success">NOAA 19</Badge>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col className="justify-content-center">
            <SatelliteSight azimuth={203.62} elevation={29.09} />
          </Col>
        </Row>
        <Row>
          <Col>
            <p>Elevation : <Badge variant={getElevationBadgeColorByElevationValue(4.888)}>4.888°</Badge></p>
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
        </Row>
      </Card.Body>
    </Card>
  )
}

TrackingView.propTypes = {
  currentTracking: PropTypes.object.isRequired
};

export default TrackingView;
