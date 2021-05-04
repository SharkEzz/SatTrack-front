import { useCallback, useMemo } from 'react';
import fetchSatellite from '../Services/Fetch/fetchSatellites';

const useSatellites = (apiUrl) => {
  const addSatellite = useCallback((tle) => {
    fetchSatellite(apiUrl).postSatellite(tle);
  }, [apiUrl]);

  const updateSatellite = useCallback((satelliteId, tle) => {
    fetchSatellite(apiUrl).updateSatellite(satelliteId, tle);
  }, [apiUrl]);

  const deleteSatellite = useCallback((satelliteId) => {
    fetchSatellite(apiUrl).deleteSatellite(satelliteId);
  }, [apiUrl]);

  return useMemo(() => ({
    addSatellite,
    updateSatellite,
    deleteSatellite,
  }), [
    addSatellite,
    updateSatellite,
    deleteSatellite,
  ]);
};

export default useSatellites;
