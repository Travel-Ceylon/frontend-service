import React from 'react';

function BookingCard({
    image,
    title,
    date,
    location,
    buttonText = 'View bookings',
    onClick,
    index
}) {
    return (
        <div className='w-full bg-white rounded-md flex items-center justify-between gap-4 p-4 border border-gray-200 max-h-fit'>
            <div>
                <img src={image} className='size-28 rounded-md object-cover' alt="Service" />
            </div>
            <div className='w-full'>
                <div className='flex justify-between items-center gap-4'>
                    <h3 className='text-lg font-semibold'>{title}</h3>
                    <p className='text-sm'>{date}</p>
                </div>
                <p className='text-sm text-black/70'>{location}</p>

                <button
                    className='cursor-pointer w-full px-4 py-2 rounded-md bg-green-300 mt-6 hover:bg-green-400 transition'
                    onClick={() => onClick(index)}
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
}

export default BookingCard;