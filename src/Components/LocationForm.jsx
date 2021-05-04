import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';

const LocationForm = ({
  currentLocation, setCurrentLocation, BodyWrapper, FooterWrapper,
}) => {
  const { control, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = useCallback((data) => {
    setCurrentLocation(data);
  }, [setCurrentLocation]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <BodyWrapper>
        <Form.Group>
          <Form.Label htmlFor="latitude">Latitude</Form.Label>
          <Controller
            name="latitude"
            control={control}
            defaultValue={currentLocation.latitude}
            rules={{
              required: true,
              min: -90,
              max: 90,
            }}
            render={({ field }) => (
              <Form.Control
                id="latitude"
                type="number"
                step="0.01"
                min="-90"
                max="90"
                {...field}
                isInvalid={errors.latitude}
              />
            )}
          />
          {errors.latitude
            && <Form.Control.Feedback type="invalid">Error: Invalid latitude</Form.Control.Feedback>}
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="longitude">Longitude</Form.Label>
          <Controller
            name="longitude"
            control={control}
            defaultValue={currentLocation.longitude}
            rules={{
              required: true,
              min: -180,
              max: 180,
            }}
            render={({ field }) => (
              <Form.Control
                id="longitude"
                type="number"
                step="0.01"
                min="-180"
                max="180"
                {...field}
                isInvalid={errors.longitude}
              />
            )}
          />
          {errors.longitude
            && <Form.Control.Feedback type="invalid">Error: Invalid longitude</Form.Control.Feedback>}
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="longitude">Altitude (meters)</Form.Label>
          <Controller
            name="altitude"
            control={control}
            defaultValue={currentLocation.altitude}
            rules={{
              required: true,
              min: 0,
              max: 5000,
            }}
            render={({ field }) => (
              <Form.Control
                id="altitude"
                type="number"
                min="0"
                max="5000"
                {...field}
                isInvalid={errors.altitude}
              />
            )}
          />
          {errors.altitude
            && <Form.Control.Feedback type="invalid">Error: Invalid altitude</Form.Control.Feedback>}
        </Form.Group>
      </BodyWrapper>
      <FooterWrapper>
        <Button type="submit" variant="success">Confirm</Button>
      </FooterWrapper>
    </Form>
  );
};

LocationForm.propTypes = {
  currentLocation: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    altitude: PropTypes.number,
  }),
  setCurrentLocation: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  BodyWrapper: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  FooterWrapper: PropTypes.object.isRequired,
};

LocationForm.defaultProps = {
  currentLocation: {},
};

export default LocationForm;
