import React, { useCallback } from 'react';
import { Form, Card, Button } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import PropTypes from 'prop-types';

const TrackingForm = ({ isTracking }) => {
  const {
    control, handleSubmit, formState: { errors },
  } = useForm();

  const onSubmit = useCallback((data) => {
    console.log('track satId: ', data.satSelect);
    // TODO
  }, []);

  return (
    <Card>
      <Card.Header>Select tracking</Card.Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Card.Body>
          <Form.Group>
            <Form.Label htmlFor="selectSat">Visible satellites</Form.Label>
            <Controller
              name="satSelect"
              control={control}
              rules={{
                required: true,
                min: 1,
              }}
              render={({ field }) => (
                <>
                  <Form.Control
                    as="select"
                    required
                    {...field}
                    isInvalid={errors.satSelect}
                  >
                    <option value="0">&nbsp;</option>
                    <option value="1">Sat1</option>
                    <option value="2">Sat2</option>
                  </Form.Control>
                </>
              )}
            />
            {errors.satSelect && <Form.Control.Feedback type="invalid">Error: please select a satellite</Form.Control.Feedback>}

          </Form.Group>
        </Card.Body>
        <Card.Footer className="text-center">
          {!isTracking ? <Button type="submit" variant="success">Start tracking</Button> : <Button variant="danger">Stop tracking</Button>}
        </Card.Footer>
      </Form>
    </Card>
  );
};

TrackingForm.propTypes = {
  isTracking: PropTypes.bool,
};

TrackingForm.defaultProps = {
  isTracking: false,
};

export default TrackingForm;
