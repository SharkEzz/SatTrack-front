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
      <Card.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
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
                    name="selectSat"
                    as="select"
                    required
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...field}
                  >
                    <option value="0">...</option>
                    <option value="1">Sat1</option>
                    <option value="2">Sat2</option>
                  </Form.Control>
                </>
              )}
            />
            {errors.satSelect && <Form.Text className="text-danger">Error: please select a satellite</Form.Text>}

          </Form.Group>
          {!isTracking ? <Button type="submit" variant="success">Start tracking</Button> : <Button variant="danger">Stop tracking</Button>}
        </Form>
      </Card.Body>
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
