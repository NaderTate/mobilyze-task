import { useState } from 'react';

import useLocations from 'src/store/locations';

interface LocationFormProps {
  location: { lat: number; lng: number };
  onClose: () => void;
}
function LocationForm({ location, onClose }: LocationFormProps) {
  const saveLocatoin = useLocations((state) => state.saveNewLocation);
  const [name, setName] = useState('');

  return (
    <form>
      <input
        className="rounded-md p-2 border border-blue-900 outline-none my-1"
        type="text"
        placeholder="Location name"
        onChange={(e) => setName(e.target.value)}
      />
      <button
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors ${!name && 'opacity-50'}`}
        type="submit"
        disabled={!name}
        onClick={() => {
          saveLocatoin({ location, name });
          onClose();
        }}
      >
        Save
      </button>
    </form>
  );
}

export default LocationForm;
