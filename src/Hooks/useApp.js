import { useMemo, useState } from 'react';

const useApp = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [serverInfos, setServerInfos] = useState({
    ip: undefined,
    port: undefined,
  });
  const [currentLocation, setCurrentLocation] = useState({
    latitude: undefined,
    longitude: undefined,
    altitude: undefined,
  });

  return useMemo(() => ({
    isConnected,
    serverInfos,
    currentLocation,
    setIsConnected,
    setServerInfos,
    setCurrentLocation,
  }), [currentLocation, serverInfos, isConnected]);
};

export default useApp;
