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
        Tracked satellite : <Badge variant="success">{currentTracking.name}</Badge>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col className="justify-content-center">
            <SatelliteSight satelliteName={currentTracking.name} azimuth={203.62} elevation={29.09} />
          </Col>
        </Row>
        <Row>
          <Col>
            <p>Elevation : <Badge variant={getElevationBadgeColorByElevationValue(4.888)}>{currentTracking.elevation} °</Badge></p>
          </Col>
          <Col>
            <p>Azimuth : <Badge variant="secondary">{currentTracking.azimuth} °</Badge></p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>Altitude : <Badge variant="info">{currentTracking.altitude} km</Badge></p>
          </Col>
          <Col>
            <p>Velocity : <Badge variant="warning">{currentTracking.speed} km/s</Badge></p>
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
