import React from 'react';
import { useHotelStore } from '../store/hotelStore';

const RoomCard = ({ room }) => {
  const { deleteRoom } = useHotelStore();

  // room may be a populated object, a plain object, or an id string
  const isString = typeof room === 'string' || typeof room === 'number';
  const id = isString ? room : (room?._id || room?.id || null);

  const roomType = isString ? 'Room' : (room?.roomType || 'Room');
  const price = isString ? 0 : (room?.price ?? 0);
  const maxGuest = isString ? 1 : (room?.maxGuest ?? 1);
  const bedType = isString ? '' : (room?.bedType || '');
  const image = isString ? '' : (room?.image || room?.images?.[0] || '');
  const facilites = isString ? {} : (room?.facilites || {});

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-48 bg-gray-200 relative">
        {image ? (
          <img
            src={image}
            alt={roomType}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">No image</div>
        )}

        {id && (
          <button
            onClick={() => deleteRoom(id)}
            className="absolute top-2 right-2 bg-red-500 cursor-pointer hover:bg-red-600 text-white p-2 rounded-full"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg">{roomType}</h3>
          <span className="font-bold text-blue-600">{price ? `₨ ${price}` : 'Free'}</span>
        </div>

        <div className="text-sm text-gray-600 mb-2">
          <span>{bedType}{bedType ? ' • ' : ''}{maxGuest} guest{maxGuest > 1 ? 's' : ''}</span>
        </div>

        <div className="flex gap-2 mt-3">
          {facilites?.AC && (
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">AC</span>
          )}
          {facilites?.WIFI && (
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">WiFi</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomCard;