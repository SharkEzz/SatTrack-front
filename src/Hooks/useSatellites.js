import { useCallback, useState, useEffect, useMemo } from "react";
import fetchSatellites from '../Services/Fetch/fetchSatellites';

const useSatellites = () => {
    const [currentTracking, setCurrentTracking] = useState();
    const [satellites, setSatellites] = useState([]);
    const [visibleSatellites, setVisibleSatellites] = useState([]);
    const [currentLocation, setCurrentLocation] = useState();
    const [savedLocation, setSavedLocation] = useState();
    const [isTracking, setIsTracking] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const editSavedLocation = useCallback(({lat, lng, alt}) => {
        return fetchSatellites.setCurrentSelectedPosition({lat, lng, alt}).then((res) => {
            console.log('location', res);
        }).catch(() => {
            throw new Error('Cannot set current location');
        })
    }, []);

    const editCurrentTracking = useCallback((id) => {
        return fetchSatellites.setCurrentTracking(id).then(({satellite}) => {
            setCurrentTracking(satellite);
        }).catch(() => {
            throw new Error('Cannot set current location');
        })
    }, []);

    const editTracking = useCallback(({satelliteId, location: {lat, lng, alt}}) => {
        return editSavedLocation({lat, lng, alt}).then(() => {
            return editCurrentTracking(satelliteId);
        })
    }, [editCurrentTracking, editSavedLocation]);

    const editSatellite = useCallback(({id, tle}) => {
        fetchSatellites.editSatellite(id, tle).then((sat) => {
            console.log(sat);
        }).catch(() => {
            throw new Error('Cannot set satellite');
        })
    }, []);

    const getUserGeolocation = useCallback((setFieldValue) => {
        navigator.geolocation.getCurrentPosition((pos) => {
            const { coords } = pos;
            setCurrentLocation({
                lat: coords.latitude.toFixed(4),
                lng: coords.longitude.toFixed(4)
            });
            setFieldValue('lat', coords.latitude.toFixed(4));
            setFieldValue('lng', coords.longitude.toFixed(4));
        });
    }, []);

    const saveLocation = useCallback(({ lat, lng, elev }) => {
        setSavedLocation({
            lat,
            lng,
            elev
        });
    }, []);
    
    const refreshVisibleSatellites = useCallback(() => {
        return fetchSatellites
            .getVisibleSatellites()
            .then((sats) => setVisibleSatellites(sats));
    }, []);
    
    const refreshSelectedPosition = useCallback(() => {
        return fetchSatellites
            .getCurrentSelectedPosition()
            .then((pos) => setSavedLocation(pos));
    }, []);
    
    const refreshCurrentTracking = useCallback(() => {
        return fetchSatellites
            .getCurrentTracking()
            .then((sat) => setCurrentTracking(sat));
    }, []);

    const refreshSatellites = useCallback(() => {
        return fetchSatellites
            .getSatellites().then((sats) => setSatellites(sats));
    }, [])
    
    useEffect(() => {
        (async () => {
            await refreshSatellites();
            await refreshVisibleSatellites();
            await refreshSelectedPosition();
            await refreshCurrentTracking();
            setIsLoaded(true);
        })()
    }, [
        refreshSatellites,
        refreshCurrentTracking,
        refreshSelectedPosition,
        refreshVisibleSatellites,
        setIsLoaded
    ]);

    return useMemo(() => ({
        currentLocation,
        currentTracking,
        visibleSatellites,
        savedLocation,
        isTracking,
        isLoaded,
        getUserGeolocation,
        saveLocation,
        refreshVisibleSatellites,
        refreshSelectedPosition,
        refreshCurrentTracking,
        setIsTracking,
        editTracking,
        editCurrentTracking,
        satellites
    }), [currentLocation,
        currentTracking,
        getUserGeolocation,
        isLoaded,
        isTracking,
        refreshCurrentTracking,
        refreshSelectedPosition,
        refreshVisibleSatellites,
        visibleSatellites,
        saveLocation,
        savedLocation,
        setIsTracking,
        editTracking,
        editCurrentTracking,
        satellites
    ]);
}

export default useSatellites;
