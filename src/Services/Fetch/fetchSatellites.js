const API_URL = 'http://localhost:8080/api';

const fetchSatellites = {
    getSatellites: () => fetch(`${API_URL}/satellites`).then(res => res.json()),
    getVisibleSatellites: () => fetch(`${API_URL}/visible_satellites`).then(res => res.json()),
    addSatellite: (tle) => fetch(`${API_URL}/satellites`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({tle})
        }).then((res) => res.json()),
    editSatellite: (id, tle) => fetch(`${API_URL}/satellites/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({tle})
        }).then((res) => res.json()),
    deleteSatellite: (id) => fetch(`${API_URL}/satellites/${id}`, {
            method: 'DELETE'
        }),
    
        
    getCurrentTracking: () => fetch(`${API_URL}/current_tracking`).then(res => res.json()).then(sats => sats.satellite),
    setCurrentTracking: (satelliteId) => fetch(`${API_URL}/current_tracking`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({satelliteId})
        }).then((res) => res.json()),

    getCurrentSelectedPosition: () => fetch(`${API_URL}/user_location`).then(res => res.json()),
    setCurrentSelectedPosition: ({lat, lng, alt}) => fetch(`${API_URL}/user_location`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({lat, lng, alt})
        }).then((res) => res.json()),
}


export default fetchSatellites;
