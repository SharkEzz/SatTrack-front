const fetchSatellites = {
    getCurrentTracking: () => {
        return Promise.resolve({id: 1, name: 'NOAA 19'})
    },
    getVisibleSatellites: () => {
        return Promise.resolve([
            {id: 1, name: 'NOAA 19'},
            {id: 2, name: 'Meteor M-2'}
        ])
    },
    getCurrentSelectedPosition: () => {
        return Promise.resolve(
            {
                lat: 1,
                lng: 1,
                alt: 400
            }
        );
    }
}


export default fetchSatellites;
