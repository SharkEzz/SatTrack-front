import { useMemo, useCallback, useState, useEffect } from "react";
import fetchSatellites from '../Services/Fetch/fetchSatellites';

const useSatellites = () => {
    const [currentTracking, setCurrentTracking] = useState();
    const [satellites, setSatellites] = useState([]);
    const [savedLocation, setSavedLocation] = useState();
    const [currentLocation, setCurrentLocation] = useState();
    const [isTracking, setIsTracking] = useState(false);

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

    const saveLocation = ({ lat, lng, elev }) => {
        setSavedLocation({
            lat,
            lng,
            elev
        });
    };
    
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
        refreshVisibleSatellites();
        refreshSelectedPosition();
        refreshCurrentTracking();
    }, []);

    return useMemo(() => ({
        currentTracking,
        getUserGeolocation,
        refreshVisibleSatellites,
        refreshSelectedPosition,
        refreshCurrentTracking,
        satellites,
        savedLocation,
        currentLocation,
        saveLocation,
        isTracking
    }), [
        currentTracking,
        getUserGeolocation,
        refreshVisibleSatellites,
        refreshSelectedPosition,
        refreshCurrentTracking,
        satellites,
        savedLocation,
        currentLocation,
        saveLocation,
        isTracking
    ]);
}

export default useSatellites;
