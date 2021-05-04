const fetchLocation = (apiUrl) => {
  const updateLocation = ({ latitude, longitude, altitude }) => fetch(`${apiUrl}/location`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PATCH',
    body: JSON.stringify({
      latitude, longitude, altitude,
    }),
  });

  return {
    updateLocation,
  };
};

export default fetchLocation;
