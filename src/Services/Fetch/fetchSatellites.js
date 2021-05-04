const fetchSatellite = (apiUrl) => {
  const postSatellite = (tle) => fetch(`${apiUrl}/satellites`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      tle,
    }),
  });
  const updateSatellite = (satelliteId, tle) => fetch(`${apiUrl}/satellites/${satelliteId}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PATCH',
    body: JSON.stringify({
      tle,
    }),
  });
  const deleteSatellite = (satelliteId) => fetch(`${apiUrl}/satellites/${satelliteId}`, {
    method: 'DELETE',
  });

  return {
    postSatellite,
    updateSatellite,
    deleteSatellite,
  };
};

export default fetchSatellite;
