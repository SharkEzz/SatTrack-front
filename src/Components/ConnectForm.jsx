import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Badge } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';

const ConnectForm = ({
  isConnected, serverInfos, setServerInfos, setIsConnected, modalOpened, BodyWrapper, FooterWrapper,
}) => {
  const { handleSubmit, control, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // TODO
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <BodyWrapper>
        <div className="mb-3 d-flex justify-content-between align-items-center">
          <span>Current status:</span>
          <Badge variant="danger">Disconnected</Badge>
        </div>
        <hr />
        <Form.Group>
          <Form.Label htmlFor="serverIP">Server IP</Form.Label>
          <Controller
            name="serverIP"
            control={control}
            rules={{
              required: true,
              pattern: /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
            }}
            render={({ field }) => (
              <Form.Control
                type="text"
                id="serverIP"
                placeholder="127.0.0.1"
                required
                {...field}
                isInvalid={errors.serverIP}
              />
            )}
          />
          {errors.serverIP && <Form.Control.Feedback type="invalid">Error: invalid server IP</Form.Control.Feedback>}
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="serverPort">Server port</Form.Label>
          <Controller
            name="serverPort"
            control={control}
            rules={{
              required: true,
              min: 0,
              max: 65536,
            }}
            render={({ field }) => (
              <Form.Control
                type="number"
                min="0"
                max="65536"
                id="serverPort"
                placeholder="8080"
                {...field}
                isInvalid={errors.serverPort}
              />
            )}
          />
          {errors.serverPort && <Form.Control.Feedback type="invalid">Error: invalid server port</Form.Control.Feedback>}
        </Form.Group>
      </BodyWrapper>
      <FooterWrapper>
        <Button type="button" variant="secondary" onClick={() => modalOpened(false)}>Close</Button>
        {isConnected ? <Button type="button" variant="danger">Disconnect</Button>
          : <Button type="submit" variant="success">Connect</Button>}
      </FooterWrapper>
    </Form>
  );
};

ConnectForm.propTypes = {
  isConnected: PropTypes.bool.isRequired,
  serverInfos: PropTypes.shape({
    ip: PropTypes.string,
    port: PropTypes.string,
  }).isRequired,
  setServerInfos: PropTypes.func.isRequired,
  setIsConnected: PropTypes.func.isRequired,
  modalOpened: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  BodyWrapper: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  FooterWrapper: PropTypes.object.isRequired,
};

export default ConnectForm;
