import {
  useState, useCallback, useMemo, useRef,
} from 'react';

const useWs = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [serverAddress, setServerAddress] = useState();
  const [latestMessage, setLatestMessage] = useState({});
  const [restServerAddress, setRestServerAddress] = useState();
  const websocketRef = useRef(null);

  const handleMessage = useCallback((event) => {
    setLatestMessage(JSON.parse(event.data));
  }, []);

  const handleOpen = useCallback(() => {
    setIsConnected(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsConnected(false);
    setRestServerAddress();
  }, []);

  const connect = useCallback((address) => {
    websocketRef.current = new WebSocket(address);
    const { host: restHost } = new URL(address);
    const restAddress = `http://${restHost}/api`;

    setServerAddress(address);
    setRestServerAddress(restAddress);

    websocketRef.current.onopen = handleOpen;
    websocketRef.current.onclose = handleClose;
    websocketRef.current.onmessage = handleMessage;
  }, [handleOpen, handleClose, handleMessage, websocketRef]);

  const disconnect = useCallback(() => {
    websocketRef.current.close();
  }, [websocketRef]);

  return useMemo(() => ({
    serverAddress,
    isConnected,
    latestMessage,
    restServerAddress,
    connect,
    disconnect,
  }), [
    serverAddress,
    isConnected,
    latestMessage,
    restServerAddress,
    connect,
    disconnect,
  ]);
};

export default useWs;
