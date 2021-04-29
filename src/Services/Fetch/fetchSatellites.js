const fakeSatellites = [
    {id: 1, name: 'NOAA 19', elevation: 10, azimuth: 25, speed: 800, altitude: 800},
    {id: 2, name: 'Meteor M-2', elevation: 5.5, azimuth: 30, speed: 35000, altitude: 35000}
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
