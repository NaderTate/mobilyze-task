import { create } from 'zustand';

interface LocationStore {
  allLocations: LocationData[];
  saveNewLocation: (location: LocationData) => void;
  deleteLocation: (location: { lat: number; lng: number }) => void;
  editLocation: (
    location: { lat: number; lng: number },
    newName: string
  ) => void;
}

const getLocations = () => {
  const locations = localStorage.getItem('locations');
  if (locations) {
    return JSON.parse(locations);
  }
  return [];
};

const useLocations = create<LocationStore>((set) => ({
  allLocations: getLocations(),

  saveNewLocation: (location: LocationData) => {
    const currentLocations = getLocations();
    currentLocations.push({ location: location.location, name: location.name });
    localStorage.setItem('locations', JSON.stringify(currentLocations));
    set({ allLocations: currentLocations });
  },

  editLocation: (location: { lat: number; lng: number }, newName: string) => {
    const currentLocations = getLocations();
    const newLocations = currentLocations.map((loc: LocationData) => {
      if (
        loc.location.lat === location.lat &&
        loc.location.lng === location.lng
      ) {
        return { location: loc.location, name: newName };
      }
      return loc;
    });
    localStorage.setItem('locations', JSON.stringify(newLocations));
    set({ allLocations: newLocations });
  },

  deleteLocation: (location: { lat: number; lng: number }) => {
    const currentLocations = getLocations();
    const newLocations = currentLocations.filter(
      (loc: { location: { lat: number; lng: number } }) =>
        loc.location.lat !== location.lat && loc.location.lng !== location.lng
    );
    localStorage.setItem('locations', JSON.stringify(newLocations));
    set({ allLocations: newLocations });
  },
}));

export default useLocations;
