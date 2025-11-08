import React from 'react';
import { useHotelStore } from '../store/hotelStore';

const RoomCard = ({ room }) => {
  const {
    _id,
    roomType,
    price,
    maxGuest,
    bedType,
    image,
    facilites = {}
  } = room;

  const {deleteRoom} = useHotelStore()

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Image */}
      <div className="h-48 bg-gray-200 relative">
        <img 
          src={image}
          alt={roomType}
          className="w-full h-full object-cover"
        />
        
        {/* Delete Button */}
        <button
          onClick={() => deleteRoom(_id)}
          className="absolute top-2 right-2 bg-red-500 cursor-pointer hover:bg-red-600 text-white p-2 rounded-full"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg">{roomType}</h3>
          <span className="font-bold text-blue-600">${price}</span>
        </div>

        <div className="text-sm text-gray-600 mb-2">
          <span>{bedType} • {maxGuest} guests</span>
        </div>

        {/* Facilities */}
        <div className="flex gap-2 mt-3">
          {facilites.AC && (
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
              AC
            </span>
          )}
          {facilites.WIFI && (
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
              WiFi
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomCard;