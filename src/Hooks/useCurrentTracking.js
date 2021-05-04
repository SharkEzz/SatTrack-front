import { useCallback, useMemo } from 'react';
import fetchCurrentTracking from '../Services/Fetch/fetchCurrentTracking';

const useCurrentTracking = (apiUrl) => {
  const updateTracking = useCallback((satelliteId) => {
    fetchCurrentTracking(apiUrl).setCurrentTracking(satelliteId);
  }, [apiUrl]);

  const deleteTracking = useCallback(() => {
    fetchCurrentTracking(apiUrl).stopCurrentTracking();
  }, [apiUrl]);

  return useMemo(() => ({
    updateTracking,
    deleteTracking,
  }), [
    updateTracking,
    deleteTracking,
  ]);
};

export default useCurrentTracking;
