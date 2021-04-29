import React, { useState } from 'react'
import { Formik } from 'formik';
import { Card, Row, Col, Button, InputGroup, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const TrackingForm = ({ satellites, isTracking, getUserGeolocation, onSubmit }) => {

    const [error, setError] = useState();

    const handleSubmit = ({ satSelect, lat, lng, elev }, { setSubmitting }) => {
        onSubmit({
            satellite: satSelect,
            location: {
                lat,
                lng,
                elev
            }
        })
            .then(() => setSubmitting())
            .catch(({ message }) => {
                setError(message);
                setSubmitting();
                setTimeout(() => setError(undefined), 5000);
            });
    }

    const validate = (values) => {
        const errors = {};

        Object.entries(values).forEach(([key, value]) => {
            if (value === undefined || value === '')
                errors[key] = 'Required';
        });

        return errors;
    }

    return (
        <Formik
            validateOnChange={false}
            validateOnBlur={false}
            initialValues={{}}
            validate={validate}
            onSubmit={handleSubmit}
            enableReinitialize
        >
            {({ values, errors, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue }) => (
                <Card>
                    <Card.Header>
                        <Row className="justify-content-between align-items-center px-3">
                            <span>Satellite selection</span>
                            <Button variant="primary" size="sm" onClick={() => getUserGeolocation(setFieldValue)}>Locate me!</Button>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
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
                                        <Form.Control required type="number" step=".0001" id="lat" name="lat" onBlur={handleBlur} onChange={handleChange} value={values.lat}></Form.Control>
                                        {errors.lat && <Form.Text className="text-danger">Current latitude required</Form.Text>}
                                    </Form.Group>
                                </Col>
                                <Col md={4} sm={12}>
                                    <Form.Group>
                                        <Form.Label htmlFor="lng">Current longitude</Form.Label>
                                        <Form.Control required type="number" step=".0001" id="lng" name="lng" onBlur={handleBlur} onChange={handleChange} value={values.lng}></Form.Control>
                                        {errors.lng && <Form.Text className="text-danger">Current longitude required</Form.Text>}
                                    </Form.Group>
                                </Col>
                                <Col md={4} sm={12}>
                                    <Form.Group>
                                        <Form.Label htmlFor="elev">Current altitude</Form.Label>
                                        <InputGroup>
                                            <Form.Control required type="number" step="1" id="elev" name="elev" onBlur={handleBlur} onChange={handleChange} value={values.elev}></Form.Control>
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
                                    <Button type="button" onClick={() => console.log('stop track')} className="mt-3 mx-auto" variant="danger" disabled={isSubmitting}>Stop tracking</Button> :
                                    <Button type="submit" className="mt-3 mx-auto" variant="success" disabled={isSubmitting}>Start tracking</Button>
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
    getUserGeolocation: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default TrackingForm;
