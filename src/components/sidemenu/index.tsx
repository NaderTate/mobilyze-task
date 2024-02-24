import useSideMenu from 'src/store/side-menu';

import LocationCard from '../location-card';
import ToggleButton from './toggle-button';

interface SideMenuProps {
  allLocations: LocationData[];
  setCenter: (location: { lat: number; lng: number }) => void;
}

function SideMenu({ allLocations, setCenter }: SideMenuProps) {
  const [isOpen] = useSideMenu((state) => [state.isOpen]);

  return (
    <>
      <ToggleButton />
      <div
        className={`h-screen bg-white/10 backdrop-blur-md p-3 z-20 w-48 absolute ${
          isOpen ? 'left-0' : '-left-48'
        } transition-all duration-300
    }`}
      >
        <h1 className="text-lg font-bold mt-14">Saved Locations:</h1>

        {allLocations.length > 0 ? (
          <ul>
            {allLocations.map((location) => (
              <LocationCard
                setCenter={setCenter}
                key={location.name}
                location={location}
              />
            ))}
          </ul>
        ) : (
          <p className="mt-5">No saved locations</p>
        )}
      </div>
    </>
  );
}

export default SideMenu;
