import React from 'react';
import {
  Card,
  Row,
  Col,
  Badge,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import PolarView from './UI/PolarView';

const TrackingView = ({ trackedSatellite }) => (
  <Card>
    <Card.Header>Current tracking</Card.Header>
    <Card.Body className="text-center">
      <Row>
        <Col>
          <PolarView azimuth={130} elevation={49} />
        </Col>
      </Row>
      <Row>
        <Col>
          <p>
            Elevation :&nbsp;
            <Badge variant="primary">0 °</Badge>
          </p>
        </Col>
        <Col>
          <p>
            Azimuth :&nbsp;
            <Badge variant="secondary">0 °</Badge>
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>
            Altitude :&nbsp;
            <Badge variant="info">0 km</Badge>
          </p>
        </Col>
        <Col>
          <p>
            Velocity :&nbsp;
            <Badge variant="warning">0 km/s</Badge>
          </p>
        </Col>
      </Row>
    </Card.Body>
  </Card>
);

TrackingView.propTypes = {
  trackedSatellite: PropTypes.shape({
    name: PropTypes.string.isRequired,
    azimuth: PropTypes.number.isRequired,
    elevation: PropTypes.number.isRequired,
    altitude: PropTypes.number.isRequired,
    velocity: PropTypes.number.isRequired,
  }).isRequired,
};

export default TrackingView;
