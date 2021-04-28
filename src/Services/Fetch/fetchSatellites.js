const fakeSatellites = [
    {id: 1, name: 'NOAA 19'},
    {id: 2, name: 'Meteor M-2'}
];

const fetchSatellites = {
    getCurrentTracking: () => {
        return Promise.resolve(fakeSatellites[0])
    },
    getVisibleSatellites: () => {
        return Promise.resolve(fakeSatellites)
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
