import React, { useCallback, useEffect, useState } from 'react'
import { Formik } from 'formik';
import { Card, Row, Col, Button, InputGroup, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const TrackingForm = ({ satellites, isTracking, onSubmit, onStopTracking, savedLocation }) => {
    const [error, setError] = useState();
    const [initialValues, setInitialValues] = useState({
        satSelect: undefined,
        lat: undefined,
        lng: undefined,
        elev: undefined,
    })

    useEffect(() => {
        if(savedLocation)
        {
            setInitialValues((initialValues) => ({...initialValues, lat: savedLocation.lat, lng: savedLocation.lng}))
        }
    }, [savedLocation]);

    const setCurrentLocation = useCallback((setFieldValue) => {
        if (!('geolocation' in navigator))
        throw new Error("You can't use geolocation with this browser");

        navigator.geolocation.getCurrentPosition((pos) => {
            const { latitude, longitude } = pos.coords;
            setFieldValue('lat', latitude.toFixed(4));
            setFieldValue('lng', longitude.toFixed(4));
        });
    }, []);

    const handleSubmit = useCallback(({ satSelect, lat, lng, elev }, { setSubmitting }) => {
        onSubmit({
            satelliteId: satSelect,
            location: {
                lat,
                lng,
                alt: elev / 1000
            }
        })
            .then(() => setSubmitting())
            .catch(({ message }) => {
                setError(message);
                setSubmitting();
                setTimeout(() => setError(undefined), 5000);
            });
    }, [onSubmit]);

    const validate = useCallback((values) => {
        const errors = {};
        Object.entries(values).forEach(([key, value]) => {
            if (value === undefined || value === '')
                errors[key] = 'Required';
        });
        return errors;
    }, []);

    return (
        <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={handleSubmit}
            enableReinitialize
        >
            {({ values, errors, handleChange, handleBlur, submitForm, isSubmitting, setFieldValue, isValid }) => (
                <Card>
                    <Card.Header>
                        <Row className="justify-content-between align-items-center px-3">
                            <span>Satellite selection</span>
                            <Button variant="primary" size="sm" onClick={() => setCurrentLocation(setFieldValue)}>Locate me!</Button>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label htmlFor="satSelect">Visible satellites</Form.Label>
                                <Form.Control required id="satSelect" name="satSelect" as="select" value={values.satSelect} onBlur={handleBlur} onChange={handleChange}>
                                    <option value={undefined}></option>
                                    {satellites.map((sat) => (
                                        <option key={sat.id} value={sat.id}>{sat.name}</option>
                                    ))}
                                </Form.Control>
                                {errors.satSelect && <Form.Text className="text-danger">Satellite required</Form.Text>}
                            </Form.Group>
                            <Row>
                                <Col md={4} sm={12}>
                                    <Form.Group>
                                        <Form.Label htmlFor="lat">Current latitude</Form.Label>
                                        <Form.Control required type="number" step=".0001" min="0" id="lat" name="lat" onBlur={handleBlur} onChange={handleChange} value={values.lat}></Form.Control>
                                        {errors.lat && <Form.Text className="text-danger">Current latitude required</Form.Text>}
                                    </Form.Group>
                                </Col>
                                <Col md={4} sm={12}>
                                    <Form.Group>
                                        <Form.Label htmlFor="lng">Current longitude</Form.Label>
                                        <Form.Control required type="number" step=".0001" min="0" id="lng" name="lng" onBlur={handleBlur} onChange={handleChange} value={values.lng}></Form.Control>
                                        {errors.lng && <Form.Text className="text-danger">Current longitude required</Form.Text>}
                                    </Form.Group>
                                </Col>
                                <Col md={4} sm={12}>
                                    <Form.Group>
                                        <Form.Label htmlFor="elev">Current altitude</Form.Label>
                                        <InputGroup>
                                            <Form.Control required type="number" step="1" min="0" id="elev" name="elev" onBlur={handleBlur} onChange={handleChange} value={values.elev}></Form.Control>
                                            <InputGroup.Append>
                                                <InputGroup.Text>meters</InputGroup.Text>
                                            </InputGroup.Append>
                                        </InputGroup>
                                        {errors.elev && <Form.Text className="text-danger">Current altitude required</Form.Text>}
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                {isTracking ?
                                    <Button onClick={onStopTracking} className="mt-3 mx-auto" variant="danger">Stop tracking</Button> :
                                    <Button className="mt-3 mx-auto" onClick={submitForm} variant="success" disabled={isSubmitting || !isValid}>Start tracking</Button>
                                }
                                {error && <span className="text-danger">{error}</span>}
                            </Row>
                        </Form>
                    </Card.Body>
                </Card>
            )}
        </Formik>
    );
};

TrackingForm.propTypes = {
    satellites: PropTypes.array.isRequired,
    isTracking: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onStopTracking: PropTypes.func.isRequired,
    savedLocation: PropTypes.object
};

export default TrackingForm;
