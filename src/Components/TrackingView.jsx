import React from 'react';
import { Card, Row, Col, Badge } from 'react-bootstrap';
import PolarView from './PolarView';
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
            <PolarView azimuth={currentTracking.azimuth} elevation={currentTracking.elevation} />
          </Col>
        </Row>
        <Row>
          <Col>
            <p>Elevation : <Badge variant={getElevationBadgeColorByElevationValue(4.888)}>{currentTracking.elevation.toFixed(2)} °</Badge></p>
          </Col>
          <Col>
            <p>Azimuth : <Badge variant="secondary">{currentTracking.azimuth.toFixed(2)} °</Badge></p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>Altitude : <Badge variant="info">{currentTracking.height.toFixed(0)} km</Badge></p>
          </Col>
          <Col>
            <p>Velocity : <Badge variant="warning">{currentTracking.velocity.toFixed(2)} km/s</Badge></p>
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
