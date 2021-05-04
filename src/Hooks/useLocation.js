import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import fetchLocation from '../Services/Fetch/fetchLocation';

const useLocation = (location, restServerAddress) => {
  const [currentLocation, setCurrentLocation] = useState();

  useEffect(() => {
    if (location && !currentLocation) {
      setCurrentLocation(location);
    }
  }, [location, currentLocation]);

  const setLocation = useCallback(({ latitude, longitude, altitude }) => {
    fetchLocation(restServerAddress).updateLocation({
      latitude,
      longitude,
      altitude,
    })
      .then((res) => res.json())
      .then((newLocation) => setCurrentLocation(newLocation));
  }, [restServerAddress]);

  return useMemo(() => ({
    currentLocation,
    setLocation,
  }), [
    currentLocation,
    setLocation,
  ]);
};

export default useLocation;
