import { useState, useCallback, useMemo } from 'react';

const useWs = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [serverAddress, setServerAddress] = useState();
  const [ws, setWs] = useState();
  const [latestMessage, setLatestMessage] = useState({});

  const handleMessage = useCallback((event) => {
    setLatestMessage(JSON.parse(event.data));
  }, []);

  const handleOpen = useCallback(() => {
    setIsConnected(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsConnected(false);
    setWs();
  }, []);

  const connect = useCallback((address) => {
    const wsc = new WebSocket(address);

    setServerAddress(address);
    setWs(wsc);

    wsc.onopen = handleOpen;
    wsc.onclose = handleClose;
    wsc.onmessage = handleMessage;
  }, [handleOpen, handleClose, handleMessage]);

  const disconnect = useCallback(() => {
    ws.close();
  }, [ws]);

  return useMemo(() => ({
    serverAddress,
    isConnected,
    latestMessage,
    connect,
    disconnect,
  }), [
    serverAddress,
    isConnected,
    latestMessage,
    connect,
    disconnect,
  ]);
};

export default useWs;
