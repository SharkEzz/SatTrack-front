import React, { useCallback } from 'react';
import {
  Card,
  Row,
  Col,
  Badge,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import PolarView from './UI/PolarView';

const TrackingView = ({ trackedSatellite }) => {
  const getBadgeColorByElevation = useCallback((elevation) => {
    switch (true) {
      case elevation < 15:
        return 'danger';
      case elevation < 30:
        return 'warning';
      case elevation >= 30:
        return 'primary';
      default:
        return 'success';
    }
  }, []);

  return (
    <Card>
      <Card.Header>
        Current tracking:&nbsp;
        <Badge variant="dark">{trackedSatellite ? trackedSatellite.name : 'None'}</Badge>
      </Card.Header>
      <Card.Body className="text-center">
        {trackedSatellite
          ? (
            <>
              <Row>
                <Col>
                  <PolarView
                    azimuth={trackedSatellite.azimuth}
                    elevation={trackedSatellite.elevation}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <p>
                    Elevation :&nbsp;
                    <Badge variant={getBadgeColorByElevation(trackedSatellite.elevation)}>
                      {trackedSatellite.elevation.toFixed(2)}
                      °
                    </Badge>
                  </p>
                </Col>
                <Col>
                  <p>
                    Azimuth :&nbsp;
                    <Badge variant="secondary">
                      {trackedSatellite.azimuth.toFixed(2)}
                      °
                    </Badge>
                  </p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p>
                    Altitude :&nbsp;
                    <Badge variant="info">
                      {trackedSatellite.height.toFixed(0)}
                      km
                    </Badge>
                  </p>
                </Col>
                <Col>
                  <p>
                    Velocity :&nbsp;
                    <Badge variant="warning">
                      {trackedSatellite.velocity.toFixed(2)}
                      km/s
                    </Badge>
                  </p>
                </Col>
              </Row>
            </>
          ) : <p>No satellite currently tracked</p>}
      </Card.Body>
    </Card>
  );
};

TrackingView.propTypes = {
  trackedSatellite: PropTypes.shape({
    azimuth: PropTypes.number.isRequired,
    elevation: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    isVisible: PropTypes.bool.isRequired,
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    range: PropTypes.number.isRequired,
    velocity: PropTypes.number.isRequired,
  }),
};

TrackingView.defaultProps = {
  trackedSatellite: undefined,
};

export default TrackingView;
