import React from 'react'
import BookingCard from '../../components/BookingCard';
import BillViewer from '../../components/BillViewer';

function StaysBookings() {
    const mockBookingData = [];
    return (
        <div className='grid xl:grid-cols-[2fr_3fr] grid-cols-1 gap-6 mt-6'>
            <div className="flex flex-col gap-4">
                {mockBookingData.map((item, idx) => (
                    <BookingCard
                        key={idx}
                        image={item.image}
                        title={item.title}
                        location={item.location}
                        date={item.date}
                        index={idx}
                        onClick={setSelectedBooking}
                    />
                ))}
            </div>
            {mockBookingData.length > 0 && <BillViewer {...mockBookingData[selectedBooking]} />}
        </div>
    )
}

export default StaysBookings