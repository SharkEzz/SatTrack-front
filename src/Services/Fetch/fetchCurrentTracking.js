const fetchCurrentTracking = (apiUrl) => {
  const setCurrentTracking = (satelliteId) => fetch(`${apiUrl}/current_tracking`, {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      satelliteId,
    }),
    method: 'PATCH',
  });
  const stopCurrentTracking = () => fetch(`${apiUrl}/current_tracking`, {
    method: 'DELETE',
  });

  return {
    setCurrentTracking,
    stopCurrentTracking,
  };
};

export default fetchCurrentTracking;
