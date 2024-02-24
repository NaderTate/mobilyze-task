import { useState } from 'react';

import useLocations from 'src/store/locations';

import { MdOutlineDelete } from 'react-icons/md';
import { FaRegEdit, FaRegCheckCircle } from 'react-icons/fa';

interface LocationCardProps {
  location: LocationData;
  setCenter: (location: { lat: number; lng: number }) => void;
}

function LocationCard({ location, setCenter }: LocationCardProps) {
  const [name, setName] = useState(location.name);
  const [isEditing, setIsEditing] = useState(false);

  const editLocation = useLocations((state) => state.editLocation);
  const deleteLocation = useLocations((state) => state.deleteLocation);

  return (
    <div className="p-2 bg-white/20 backdrop-blur-sm rounded-md my-2 flex items-center justify-around gap-x-1">
      {isEditing ? (
        <input
          className="rounded-md px-2 border border-blue-900 outline-none w-24 grow"
          type="text"
          placeholder="Location name"
          defaultValue={location.name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      ) : (
        <button
          type="button"
          className="w-24 font-semibold text-left overflow-hidden whitespace-nowrap overflow-ellipsis"
          onClick={() => setCenter(location.location)}
          title="View location"
        >
          {location.name}
        </button>
      )}

      {isEditing ? (
        <FaRegCheckCircle
          className="cursor-pointer flex-shrink-0"
          title="Save location"
          role="button"
          tabIndex={0}
          size={18}
          color="#276bd1"
          onClick={() => {
            editLocation(location.location, name);
            setIsEditing(false);
          }}
        />
      ) : (
        <FaRegEdit
          className="cursor-pointer flex-shrink-0"
          title="Edit location"
          role="button"
          tabIndex={0}
          onClick={() => {
            setIsEditing(true);
          }}
          size={18}
          color="#276bd1"
        />
      )}

      <MdOutlineDelete
        className="cursor-pointer"
        onClick={() => deleteLocation(location.location)}
        title="Delete location"
        role="button"
        tabIndex={0}
        size={18}
        color="#EA4335"
      />
    </div>
  );
}

export default LocationCard;
