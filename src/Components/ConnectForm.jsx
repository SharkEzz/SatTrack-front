import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Badge } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';

const ConnectForm = ({
  isConnected, serverAddress, connect, disconnect, BodyWrapper, FooterWrapper,
}) => {
  const { handleSubmit, control, formState: { errors } } = useForm();

  const onSubmit = useCallback((data) => {
    connect(data.serverAddress);
  }, [connect]);

  const onDisconnect = useCallback(() => {
    disconnect();
  }, [disconnect]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <BodyWrapper>
        <div className="mb-3 d-flex justify-content-between align-items-center">
          <span>Current status:</span>
          <Badge variant={isConnected ? 'success' : 'danger'}>{isConnected ? 'Connected' : 'Disconnected'}</Badge>
        </div>
        <hr />
        <Form.Group>
          <Form.Label htmlFor="serverAddress">Websocket server address</Form.Label>
          <Controller
            name="serverAddress"
            control={control}
            defaultValue={serverAddress}
            rules={{
              required: true,
              // TODO: validation
            }}
            render={({ field }) => (
              <Form.Control
                type="text"
                id="serverAddress"
                placeholder="ws://127.0.0.1:8080"
                required
                {...field}
                isInvalid={errors.serverAddress}
              />
            )}
          />
          {errors.serverAddress && <Form.Control.Feedback type="invalid">Error: invalid server address</Form.Control.Feedback>}
        </Form.Group>
      </BodyWrapper>
      <FooterWrapper>
        {isConnected ? <Button type="button" variant="danger" onClick={onDisconnect}>Disconnect</Button>
          : <Button type="submit" variant="success">Connect</Button>}
      </FooterWrapper>
    </Form>
  );
};

ConnectForm.propTypes = {
  isConnected: PropTypes.bool.isRequired,
  serverAddress: PropTypes.string,
  connect: PropTypes.func.isRequired,
  disconnect: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  BodyWrapper: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  FooterWrapper: PropTypes.object.isRequired,
};

ConnectForm.defaultProps = {
  serverAddress: undefined,
};

export default ConnectForm;
