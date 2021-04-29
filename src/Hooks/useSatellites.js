import { useCallback, useState, useEffect } from "react";
import fetchSatellites from '../Services/Fetch/fetchSatellites';

const useSatellites = () => {
    const [currentTracking, setCurrentTracking] = useState();
    const [satellites, setSatellites] = useState([]);
    const [savedLocation, setSavedLocation] = useState();
    const [currentLocation, setCurrentLocation] = useState();
    const [isTracking, setIsTracking] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

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
            .then((sats) => setSatellites(sats));
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
    
    useEffect(() => {
        (async () => {
            await refreshVisibleSatellites();
            await refreshSelectedPosition();
            await refreshCurrentTracking();
            setIsLoaded(true);
        })()
    }, [refreshCurrentTracking, refreshSelectedPosition, refreshVisibleSatellites, setIsLoaded]);

    return {
        currentLocation,
        currentTracking,
        satellites,
        savedLocation,
        isTracking,
        isLoaded,
        getUserGeolocation,
        saveLocation,
        refreshVisibleSatellites,
        refreshSelectedPosition,
        refreshCurrentTracking,
        setIsTracking,
    }
}

export default useSatellites;
