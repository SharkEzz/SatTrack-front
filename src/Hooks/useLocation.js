import { useMemo, useState } from 'react';

const useLocation = () => {
  const [currentLocation, setCurrentLocation] = useState({
    latitude: undefined,
    longitude: undefined,
    altitude: undefined,
  });

  return useMemo(() => ({
    currentLocation,
    setCurrentLocation,
  }), [
    currentLocation,
    setCurrentLocation,
  ]);
};

export default useLocation;
