import React from 'react';
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import blueMarker from '/assets/images/marker-icons/marker-icon-blue.png';
import greenMarker from '/assets/images/marker-icons/marker-icon-green.png';
import { getLongAndLat } from '../Fetcher/Api';
import { useQuery } from '@tanstack/react-query';

const containerStyle = {
    width: '100%',
    height: '80vh',
    borderRadius: '10px'
};

const center = {
    lat: 30.3753,
    lng: 69.3451,
};

const MyMapComponent = () => {
    let { isLoading, isError, data, error } = useQuery({
        queryKey: ['getLongAndLat'],
        queryFn: getLongAndLat,
        refetchOnWindowFocus: false,
        retry: 1,
    });
    const markers = data?.map((data: any) => ({
        lat: parseFloat(data?.pinLocation.split(',')[0]),
        lng: parseFloat(data?.pinLocation.split(',')[1]),
        buildingType: data?.buildingType
    }));


    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        // MyAccount
        // googleMapsApiKey: 'AIzaSyBQ-APxr2vz6Q1ODaY5iACix1DkrMzL36c',

        googleMapsApiKey: 'AIzaSyBXDrw0XmVRV8-IrpbovlI5vzNOQS5rpTI',
      

   
    });

    const [map, setMap] = React.useState(null);

    const onLoad = React.useCallback(function callback(map: any) {
        const bounds = new window.google.maps.LatLngBounds();
        bounds.extend({ lat: 24.49382941052909, lng: 66.28035221974302 });
        bounds.extend({ lat: 25.26626960557121, lng: 67.85015003547377 }); 
        map.fitBounds(bounds);

        setMap(map);
    }, []);

    const onUnmount = React.useCallback(function callback(map: any) {
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
            {markers?.map((data: any, i: any) => (
                <MarkerF
                    key={i}
                    position={data}
                    icon={{
                        url: data?.buildingType === 'Commercial' ? blueMarker : greenMarker,
                        scaledSize: new window.google.maps.Size(32, 32),
                    }}
                />
            ))}
        </GoogleMap>
    ) : (
        <></>
    );
};

export default MyMapComponent
// export default React.memo(MyMapComponent);
