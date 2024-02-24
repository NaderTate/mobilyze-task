import { useCallback, useState } from 'react';
import {
  APIProvider,
  Map,
  Pin,
  InfoWindow,
  AdvancedMarker,
  MapCameraChangedEvent,
} from '@vis.gl/react-google-maps';
import useLocations from 'src/store/locations';
import LocationForm from './location-form';
import SideMenu from './sidemenu';

function GoogleMap() {
  const [isOpen, setIsOpen] = useState(false);
  const allLocations = useLocations((state) => state.allLocations);

  const [center, setCenter] = useState(
    allLocations.at(-1)?.location
      ? allLocations.at(-1)?.location
      : {
          lat: 31.417379135843778,
          lng: 31.8139329353969,
        }
  );

  const [clickedLocation, setClickedLocation] = useState({
    lat: 0,
    lng: 0,
  });

  const handleCameraChange = useCallback(
    (ev: MapCameraChangedEvent) => setCenter(ev.detail.center),
    []
  );

  return (
    <APIProvider apiKey={process.env.GOOGLE_MAP_API as string}>
      <div className="h-screen">
        <Map
          onCameraChanged={handleCameraChange}
          zoomControl={false}
          mapTypeControl={false}
          center={center}
          defaultZoom={16}
          gestureHandling="greedy"
          mapId="cc93c8e2ede4cd81"
          onClick={(e) => {
            setIsOpen(true);
            setClickedLocation({
              lat: e.detail.latLng?.lat as number,
              lng: e.detail.latLng?.lng as number,
            });
          }}
        >
          <SideMenu allLocations={allLocations} setCenter={setCenter} />

          {allLocations.map(
            (location: {
              location: { lat: number; lng: number };
              name: string;
            }) => (
              <AdvancedMarker
                key={location.location.lat + location.location.lng}
                position={location.location}
              >
                <Pin />
              </AdvancedMarker>
            )
          )}

          {isOpen && (
            <InfoWindow
              position={clickedLocation}
              onCloseClick={() => {
                setIsOpen(false);
              }}
            >
              <LocationForm
                location={clickedLocation as { lat: number; lng: number }}
                onClose={() => {
                  setIsOpen(false);
                }}
              />
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
}

export default GoogleMap;
