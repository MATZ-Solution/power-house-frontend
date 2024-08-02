import React from 'react';
import { GoogleMap, MarkerF, InfoWindowF, useJsApiLoader } from '@react-google-maps/api';
import blueMarker from '/assets/images/marker-icons/marker-icon-blue.png';
import greenMarker from '/assets/images/marker-icons/marker-icon-yellow.png';
import { getLongAndLat } from '../Fetcher/Api';
import { useQuery } from '@tanstack/react-query';
import '../assets/css/infoWindowStyles.css';  // Import your CSS file

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
    lat: number;
    lng: number;
    buildingType: string;
    address: string;
    projectName: string;
    area: string;
    city: string;
}

const MyMapComponent = () => {
    const { isLoading, isError, data, error } = useQuery({
        queryKey: ['getLongAndLat'],
        queryFn: getLongAndLat,
        refetchOnWindowFocus: false,
        retry: 1,
    });

    const markers: MarkerData[] = data?.map((data: any) => ({
        lat: parseFloat(data?.pinLocation.split(',')[0]),
        lng: parseFloat(data?.pinLocation.split(',')[1]),
        buildingType: data?.buildingType,
        address: data?.address, // Assuming the data has an address field
        projectName: data?.projectName,
        area: data?.area,
        city: data?.city
    })) || [];

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyCrfTa3Yy3zUZ48hAJD_ADso4UsjF4yoNE',
    });

    const [map, setMap] = React.useState<google.maps.Map | null>(null);
    const [selectedMarker, setSelectedMarker] = React.useState<MarkerData | null>(null);

    const onLoad = React.useCallback(function callback(map: google.maps.Map) {
        const bounds = new window.google.maps.LatLngBounds();
        bounds.extend({ lat: 24.49382941052909, lng: 66.28035221974302 });
        bounds.extend({ lat: 25.26626960557121, lng: 67.85015003547377 }); 
        map.fitBounds(bounds);

        setMap(map);
    }, []);

    const onUnmount = React.useCallback(function callback(map: google.maps.Map) {
        setMap(null);
    }, []);

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={1}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
                streetViewControl: false,
                mapTypeControl: false,
            }}
        >
            {markers.map((data, i) => (
                <MarkerF
                    key={i}
                    position={data}
                    icon={{
                        url: data.buildingType === 'Commercial' ? blueMarker : greenMarker,
                        scaledSize: new window.google.maps.Size(32, 32),
                    }}
                    onClick={() => {
                        setSelectedMarker(data);
                    }}
                />
            ))}

            {selectedMarker && (
                <InfoWindowF
                    position={selectedMarker}
                    onCloseClick={() => setSelectedMarker(null)}
                >
                     <div className="p-4 bg-white rounded-lg shadow-md">
                        <h1 className="text-lg font-bold text-primary">Project Name:</h1>
                        <p className="text-base text-gray-800">{selectedMarker.projectName}</p>
                        <h1 className="text-lg font-bold text-primary mt-2">Area:</h1>
                        <p className="text-base text-gray-800">{selectedMarker.area}</p>
                        <h1 className="text-lg font-bold text-primary mt-2">City:</h1>
                        <p className="text-base text-gray-800">{selectedMarker.city}</p>
                    </div>
                </InfoWindowF>
            )}
        </GoogleMap>
    ) : (
        <></>
    );
};

export default MyMapComponent;
