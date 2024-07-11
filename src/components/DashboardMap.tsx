import React, { useState } from 'react';
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import blueMarker from '/assets/images/marker-icons/marker-icon-blue.png';
import greenMarker from '/assets/images/marker-icons/marker-icon-green.png';
import { getLongAndLat } from '../Fetcher/Api';
import { useQuery } from '@tanstack/react-query';
import Select from 'react-select';
import CodeHighlight from './../components/Highlight';


const containerStyle = {
    width: '100%',
    height: '80vh',
    borderRadius: '10px'
};

const center = {
    lat: 30.3753,
    lng: 69.3451,
};

interface MarkerData {
    id: number;
    projectName: string;
    buildingType: string;
    city: string;
    area: string;
    block: string;
    Type: string;
    size: string;
    address: string;
    pinLocation: string;
    contractorName: string;
    contractorNumber: string;
    status: string;
    created_at: string;
    updated_at: string;
    scoutedBy: number;
    assignedTo: string | null;
    projectType: string;
    refrenceId: string;
    sops: string | null;
}

const MyMapComponent: React.FC = () => {
    const [selectedArea, setSelectedArea] = useState<string>('All');
    // #######################################################
    const [codeArr, setCodeArr] = useState<string[]>([]);
    const toggleCode = (name: string) => {
        if (codeArr.includes(name)) {
            setCodeArr((value) => value.filter((d) => d !== name));
        } else {
            setCodeArr([...codeArr, name]);
        }
    };
    const options4 = [
        { value: 'orange', label: 'Orange' },
        { value: 'white', label: 'White' },
        { value: 'purple', label: 'Purple' },
    ];
    // #######################################################
    const { isLoading, isError, data, error } = useQuery<MarkerData[]>({
        queryKey: ['getLongAndLat'],
        queryFn: getLongAndLat,
        refetchOnWindowFocus: false,
        retry: 1,
    });

    const markers = data?.map((marker) => ({
        lat: parseFloat(marker.pinLocation.split(',')[0]),
        lng: parseFloat(marker.pinLocation.split(',')[1]),
        buildingType: marker.buildingType,
        area: marker.area,
        address: marker.address
    })) || [];

    const filteredMarkers = selectedArea === 'All'
        ? markers
        : markers.filter(marker =>
            marker.area === selectedArea || marker.address.includes(selectedArea)
        );

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyBXDrw0XmVRV8-IrpbovlI5vzNOQS5rpTI',
    });

    const [map, setMap] = useState<google.maps.Map | null>(null);

    const onLoad = React.useCallback((map: google.maps.Map) => {
        const bounds = new window.google.maps.LatLngBounds();
        bounds.extend({ lat: 24.49382941052909, lng: 66.28035221974302 });
        bounds.extend({ lat: 25.26626960557121, lng: 67.85015003547377 });
        map.fitBounds(bounds);

        setMap(map);
    }, []);

    const onUnmount = React.useCallback(() => {
        setMap(null);
    }, []);

    const handleAreaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedArea(event.target.value);
    };

    const uniqueAreas = Array.from(new Set(data?.map(marker => marker.area) || []));

    return (
        <>

            <div className="row">
                <div className="col-12 col-md-3">
                    <select
                        className="form-control shadow-sm bg-white rounded h-11"
                        onChange={handleAreaChange}
                        value={selectedArea}
                    >
                        <option value="All">All</option>
                        {uniqueAreas.map(area => (
                            <option key={area} value={area}>{area}</option>
                        ))}
                    </select>
                </div>
            </div>
            <br />
            <br />
            {isLoaded ? (
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={90}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                    options={{
                        streetViewControl: false,
                        mapTypeControl: false,
                    }}
                >
                    {filteredMarkers.map((marker, i) => (
                        <MarkerF
                            key={i}
                            position={{ lat: marker.lat, lng: marker.lng }}
                            icon={{
                                url: marker.buildingType === 'Commercial' ? blueMarker : greenMarker,
                                scaledSize: new window.google.maps.Size(32, 32),
                            }}
                        />
                    ))}
                </GoogleMap>
            ) : (
                <></>
            )}
        </>
    );
};

export default MyMapComponent;
