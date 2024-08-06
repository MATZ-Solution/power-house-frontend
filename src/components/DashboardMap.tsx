// import React, { useState } from 'react';
// import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';
// import blueMarker from '/assets/images/marker-icons/marker-icon-blue.png';
// import greenMarker from '/assets/images/marker-icons/marker-icon-green.png';
// import { getLongAndLat } from '../Fetcher/Api';
// import { useQuery } from '@tanstack/react-query';
// import Select, { SingleValue } from 'react-select';
// import CodeHighlight from './../components/Highlight';

// const containerStyle = {
//     width: '100%',
//     height: '80vh',
//     borderRadius: '10px'
// };

// const center = {
//     lat: 30.3753,
//     lng: 69.3451,
// };

// interface MarkerData {
//     id: number;
//     projectName: string;
//     buildingType: string;
//     city: string;
//     area: string;
//     block: string;
//     Type: string;
//     size: string;
//     address: string;
//     pinLocation: string;
//     contractorName: string;
//     contractorNumber: string;
//     status: string;
//     created_at: string;
//     updated_at: string;
//     scoutedBy: number;
//     assignedTo: string | null;
//     projectType: string;
//     refrenceId: string;
//     sops: string | null;
// }

// const MyMapComponent: React.FC = () => {
//     const [selectedArea, setSelectedArea] = useState<string>('All');
//     const [selectedBuildingType, setSelectedBuildingType] = useState<string>('All');

//     const { isLoading, isError, data, error } = useQuery<MarkerData[]>({
//         queryKey: ['getLongAndLat'],
//         queryFn: getLongAndLat,
//         refetchOnWindowFocus: false,
//         retry: 1,
//     });

//     const markers = data?.map((marker) => ({
//         lat: parseFloat(marker.pinLocation.split(',')[0]),
//         lng: parseFloat(marker.pinLocation.split(',')[1]),
//         buildingType: marker.buildingType,
//         area: marker.area,
//         address: marker.address
//     })) || [];

//     const filteredMarkers = markers.filter(marker =>
//         (selectedArea === 'All' || marker.area === selectedArea || marker.address.includes(selectedArea)) &&
//         (selectedBuildingType === 'All' || marker.buildingType === selectedBuildingType)
//     );
// // ###########################################################

// // const buildingTypeCounts = filteredMarkers.reduce((counts, marker) => {
// //     // Building type ko lowercase mein convert karna, takay case sensitive issues na ho
// //     const type = marker.buildingType.toLowerCase();
// //     // Agar type already counts mein hai, toh uski value increment kar do
// //     if (counts[type]) {
// //         counts[type]++;
// //     } else {
// //         // Naya type hai, toh uski initial value 1 set karo
// //         counts[type] = 1;
// //     }
// //     return counts;
// // }, {});
// // // Building type counts ko console par show karne ke liye
// // console.log(buildingTypeCounts);

// // ###########################################################
//     const uniqueAreas = Array.from(new Set(data?.map(marker => marker.area) || []));

//     const { isLoaded } = useJsApiLoader({
//         id: 'google-map-script',
//         // googleMapsApiKey: 'AIzaSyBXDrw0XmVRV8-IrpbovlI5vzNOQS5rpTI',
//         googleMapsApiKey: 'AIzaSyCrfTa3Yy3zUZ48hAJD_ADso4UsjF4yoNE',
//     });

//     const [map, setMap] = useState<google.maps.Map | null>(null);

//     const onLoad = React.useCallback((map: google.maps.Map) => {
//         const bounds = new window.google.maps.LatLngBounds();
//         bounds.extend({ lat: 24.49382941052909, lng: 66.28035221974302 });
//         bounds.extend({ lat: 25.26626960557121, lng: 67.85015003547377 });
//         map.fitBounds(bounds);

//         setMap(map);
//     }, []);

//     const onUnmount = React.useCallback(() => {
//         setMap(null);
//     }, []);

//     const handleAreaChange = (newValue: SingleValue<{ value: string; label: string }>) => {
//         if (newValue) {
//             console.log(newValue.value)
//             setSelectedArea(newValue.value);
//         } else {

//             setSelectedArea('All');
//         }
//     };


//     return (
//         <>
//             <div className="row">
//                 <div className="w-full md:w-1/3 px-2 mb-4">
//                     <Select

//                         options={[
//                             { value: 'All', label: 'All' },
//                             ...uniqueAreas.map(area => ({ value: area, label: area }))
//                         ]}
//                         onChange={handleAreaChange}
//                         defaultValue={{ value: 'All', label: 'All' }}
//                     // className="form-control shadow-sm bg-white rounded h-11"
//                     />
//                 </div>
//                 <div className="w-full md:w-1/3 px-2 mb-4">
//                    <b><h1>Count</h1></b>
//                 </div>
//                 <div className="w-full md:w-1/3 px-2 mb-4">
//                    <h1>Commercial</h1>
//                    <h1>Resiandial</h1>
//                    <h1>Project</h1>
//                 </div>
//             </div>
//             <br />
//             <br />
//             {isLoaded ? (
//                 <GoogleMap
//                     mapContainerStyle={containerStyle}
//                     center={center}
//                     zoom={90}
//                     onLoad={onLoad}
//                     onUnmount={onUnmount}
//                     options={{
//                         streetViewControl: false,
//                         mapTypeControl: false,
//                     }}
//                 >
//                     {filteredMarkers.map((marker, i) => (
//                         <MarkerF
//                             key={i}
//                             position={{ lat: marker.lat, lng: marker.lng }}
//                             icon={{
//                                 url: marker.buildingType === 'Commercial' ? blueMarker : greenMarker,
//                                 scaledSize: new window.google.maps.Size(32, 32),
//                             }}
//                         />
//                     ))}
//                 </GoogleMap>
//             ) : (
//                 <></>
//             )}
//         </>
//     );
// };

// export default MyMapComponent;



































import React, { useState } from 'react';
import { GoogleMap, InfoWindowF, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import blueMarker from '/assets/images/marker-icons/marker-icon-blue.png';
import greenMarker from '/assets/images/marker-icons/marker-icon-green.png';
import yellowMarker from '/assets/images/marker-icons/marker-icon-yellow.png'; // Added yellowMarker
import { getLongAndLat } from '../Fetcher/Api';
import { useQuery } from '@tanstack/react-query';
import Select, { SingleValue } from 'react-select';
import AreaSelect from './AreaSelect';

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
    const [selectedBuildingType, setSelectedBuildingType] = useState<string>('All');
    const [selectedMarker, setSelectedMarker] = React.useState<{
        id: number;
        lat: number;
        lng: number;
        buildingType: string;
        area: string;
        address: string;
        projectType: string;
        projectName: string;
        city: string;
    } | null>(null);
    const { isLoading, isError, data, error } = useQuery<MarkerData[]>({
        queryKey: ['getLongAndLat'],
        queryFn: getLongAndLat,
        refetchOnWindowFocus: false,
        retry: 1,
    });

    const markers = data?.map((marker) => ({
        id: marker.id, // Ensure each marker has a unique ID
        lat: parseFloat(marker.pinLocation.split(',')[0]),
        lng: parseFloat(marker.pinLocation.split(',')[1]),
        buildingType: marker.buildingType,
        area: marker.area,
        address: marker.address,
        projectType: marker.projectType,
        projectName: marker.projectName,
        city: marker.city
    })) || [];

    const filteredMarkers = markers.filter(marker =>
        (selectedArea === 'All' || marker.area === selectedArea || marker.address.includes(selectedArea)) &&
        (selectedBuildingType === 'All' || marker.buildingType === selectedBuildingType)
    );

    console.log("Filtered Markers:", filteredMarkers);

    // Calculate counts
    const buildingTypeCounts = filteredMarkers.reduce((counts, marker) => {
        const type = marker.buildingType;
        if (counts[type]) {
            counts[type]++;
        } else {
            counts[type] = 1;
        }
        return counts;
    }, {} as Record<string, number>);

    const commercialCount = buildingTypeCounts['Commercial'] || 0;
    const residentialCount = buildingTypeCounts['Residential'] || 0;
    const projectCount = buildingTypeCounts['Project'] || 0;

    const uniqueAreas = Array.from(new Set(data?.map(marker => marker.area) || []));

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyCrfTa3Yy3zUZ48hAJD_ADso4UsjF4yoNE',
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

    const handleAreaChange = (newValue: SingleValue<{ value: string; label: string }>) => {
        if (newValue) {
            setSelectedArea(newValue.value);
        } else {
            setSelectedArea('All');
        }
    };

    return (
        <div className='col-span-1 md:col-span-1 lg:col-span-7'>
<AreaSelect
uniqueAreas={uniqueAreas}
handleAreaChange={handleAreaChange}
commercialCount={commercialCount}
residentialCount={residentialCount}
projectCount={projectCount}

/>
<div className=" border-orange dashboarMap">
            {isLoaded ? (
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={10}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                    options={{
                        streetViewControl: false,
                        mapTypeControl: false,
                    }}
                >
                    {filteredMarkers.map((marker, i) => (
                        <MarkerF
                            key={marker.id}
                            position={{ lat: marker.lat, lng: marker.lng }}
                            icon={{
                                url: marker.buildingType === 'Commercial' ? blueMarker
                                    : marker.buildingType === 'Residential' ? yellowMarker
                                    : marker.buildingType === 'Project' ?greenMarker
                                    : blueMarker, // Default marker if buildingType is unknown
                                scaledSize: new window.google.maps.Size(31, 62),
                            }}
                            onClick={() => {
                                setSelectedMarker(marker);
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
            )}</div>
        </div>
    );
};

export default MyMapComponent;


