import React from 'react'
import ImageUploader from '../components/ImageUploader';
import { useHotelStore } from '../store/hotelStore';

function AddRoom() {
    const { addRoom, AC, WIFI, setAc, setWifi, price, setPrice, setRoomType, roomType, setBedType, bedType, image, setImage, setMaxGuest, maxGuest } = useHotelStore();
    return (
        <div>
            <form onSubmit={addRoom} className='bg-white px-8 py-4 rounded-md space-y-6'>
                <div>
                    <p className='mb-1'>Room Type</p>
                    <select className='w-full p-2 border rounded-md' value={roomType} onChange={(e) => setRoomType(e.target.value)}>
                        <option value={null}>Select one...</option>
                        {
                            ['Single Room', 'Double Room', 'Deluxe Room', 'Suite', 'Executive Suite', 'Presidential Suite'].map((option) => (
                                <option value={option}>{option}</option>
                            ))
                        }
                    </select>

                </div>

                <div>
                    <p className='mb-1'>Bed Type</p>
                    <select className='w-full p-2 border rounded-md' value={bedType} onChange={(e) => setBedType(e.target.value)}>
                        <option value={null}>Select one...</option>
                        {
                            ['Single Bed', 'Double Bed', 'Queen Bed', 'King Bed', 'Twin Beds', 'Bunk Beds'].map((option) => (
                                <option value={option}>{option}</option>
                            ))
                        }
                    </select>
                </div>

                <div>
                    <p className='mb-1'>Maximum number of guest for the room</p>
                    <input type="number" min={1} max={15} className='border rounded-md p-2' value={maxGuest} onChange={(e) => setMaxGuest(e.target.value)} />
                </div>

                <div>
                    <p className='mb-1'>Upload a image of the Room</p>
                    <ImageUploader setImage={setImage} />
                </div>

                <div>
                    <p>Facilities</p>
                    <div className='flex justify-start items-center gap-2'>
                        <p>AC</p>
                        <input type='checkbox' value={AC} onChange={(e) => setAc(e.target.checked)} />
                    </div>
                    <div className='flex justify-start items-center gap-2'>
                        <p>WIFI</p>
                        <input type='checkbox' value={WIFI} onChange={(e) => setWifi(e.target.checked)} />
                    </div>
                </div>

                <div>
                    <p className='mb-1'>Price for the room (LKR)</p>
                    <input type="number" min={0} className='border rounded-md p-2' value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>

                <div className='flex justify-between items-center gap-8'>
                    <button
                        className='px-8 py-2 rounded-md bg-green-400 text-white 
                cursor-pointer hover:bg-green-500'>
                        ADD
                    </button>
                </div>

            </form>
        </div>
    )
}

export default AddRoom