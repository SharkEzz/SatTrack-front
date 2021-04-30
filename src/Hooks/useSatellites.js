import { useCallback, useState, useEffect, useMemo } from "react";
import fetchSatellites from '../Services/Fetch/fetchSatellites';

const useSatellites = () => {
    const [currentTracking, setCurrentTracking] = useState();
    const [satellites, setSatellites] = useState([]);
    const [visibleSatellites, setVisibleSatellites] = useState([]);
    const [savedLocation, setSavedLocation] = useState();

    const editSavedLocation = useCallback(({lat, lng, alt}) => {
        return fetchSatellites.setCurrentSelectedPosition({lat, lng, alt}).then(() => {
            setSavedLocation({lat, lng, alt});
        }).catch(() => {
            throw new Error('Cannot set current location');
        })
    }, []);

    const editCurrentTracking = useCallback((id) => {
        return fetchSatellites.setCurrentTracking(id).then(({satellite}) => {
            setCurrentTracking(satellite);
        }).catch(() => {
            throw new Error('Cannot track this satellite');
        })
    }, []);

    const editTracking = useCallback(({satelliteId, location: {lat, lng, alt}}) => {
        return editSavedLocation({lat, lng, alt}).then(() => {
            return editCurrentTracking(satelliteId);
        })
    }, [editCurrentTracking, editSavedLocation]);

    const editSatellite = useCallback(({id, tle}) => {
        fetchSatellites.editSatellite(id, tle).then((sat) => {
            setSatellites((satellites) => satellites.map((s) => s.id !== id ? s : sat));
        }).catch(() => {
            throw new Error('Cannot edit satellite');
        })
    }, []);

    const deleteSatellite = useCallback((id) => {
        return fetchSatellites.deleteSatellite(id)
            .then(() => {
                setSatellites((satellites) => satellites.filter((sat) => sat.id !== id));
            }).catch(() => {
                throw new Error('Cannot delete this satellite');
            });
    }, []);

    const addSatellite = useCallback((tle) => {
        return fetchSatellites.addSatellite(tle)
            .then((sat) => {
                console.log(sat);
                setSatellites((satellites) => [...satellites, sat]);
            })
            .catch(() => {
                throw new Error("An error as occured !")
            })
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
        })()
    }, [
        refreshSatellites,
        refreshCurrentTracking,
        refreshSelectedPosition,
        refreshVisibleSatellites,
    ]);

    return useMemo(() => ({
        currentTracking,
        visibleSatellites,
        savedLocation,
        satellites,
        saveLocation,
        refreshVisibleSatellites,
        refreshSelectedPosition,
        refreshCurrentTracking,
        editTracking,
        editCurrentTracking,
        editSatellite,
        deleteSatellite,
        addSatellite
    }), [currentTracking,
        visibleSatellites,
        savedLocation,
        satellites,
        refreshCurrentTracking,
        refreshSelectedPosition,
        refreshVisibleSatellites,
        saveLocation,
        editTracking,
        editCurrentTracking,
        editSatellite,
        deleteSatellite,
        addSatellite
    ]);
}

export default useSatellites;
