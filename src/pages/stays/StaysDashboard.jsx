import React, { useState } from 'react'
import ImageGallery from '../../components/ImageGallery';
import DescriptionEditor from '../../components/DescriptionEditor';
import Checkbox from '../../components/Checkbox';
import { useHotelStore } from '../../store/hotelStore';
import { useNavigate } from 'react-router-dom';
import AddRoom from '../../components/AddRoom';
import RoomCard from '../../components/RoomCard';

function StaysDashboard() {
    const {
        profile,
        facilities,
        updateDescription,
    } = useHotelStore();

    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);

    if (!profile) {
        return (
            <></>
        )
    }


    return (
        <>
            <div className='bg-white border border-gray-200 mt-6 rounded-md p-4 md:p-8'>
                <h3 className="text-2xl font-semibold mb-4">Images</h3>
                <ImageGallery hotelImages={profile?.images} />

                <h3 className="text-2xl font-semibold mt-8 mb-3">Description</h3>
                <DescriptionEditor content={profile?.description} updateDescription={updateDescription} />

                <h2 className="text-2xl font-medium mt-8 mb-4">Room Options</h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-8'>
                    {
                        profile?.rooms &&
                        profile.rooms.map((room, index) => (
                            <RoomCard room={room} key={index} />
                        ))
                    }
                </div>

                <button onClick={() => setIsOpen(true)}
                    className='bg-green-400 px-4 py-2 rounded-md text-white font-semibold cursor-pointer'>
                    Add Room
                </button>


                <h2 className="text-2xl font-medium mt-10 mb-3">Facilities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-6 mt-3">

                    {
                        facilities.map((item, index) => {
                            return <Checkbox
                                key={index}
                                title={item[0]}
                                checked={item[1]}
                                onChange={(checked) => { }}
                            />

                        })
                    }
                </div>
            </div>
            <div onClick={() => {
                setIsOpen(false)
            }}
                className={`${isOpen ? "flex" : "hidden"} w-full h-screen overflow-x-hidden overflow-y-auto bg-black/60 fixed top-0 left-0 z-30 justify-center items-center`}>
                <div
                    onClick={(e) => e.stopPropagation()} //prevents click from reaching parent
                >
                    <AddRoom />
                </div>
            </div>
        </>
    )
}

export default StaysDashboard