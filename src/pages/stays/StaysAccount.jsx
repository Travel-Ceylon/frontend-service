import React from 'react'
import { useAuthStore } from '../../store/authStore'
import { useHotelStore } from '../../store/hotelStore';

function StaysAccount() {
    const {user} = useAuthStore();
    const {profile} = useHotelStore();

    if (!profile || !user) {
        return (
            <></>
        )
    }
    return (
        <div>
            <div className="space-y-4 mx-auto max-w-xl mt-12">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                    <p className="sm:w-20 font-medium capitalize">name</p>
                    <input
                        type={'text'}
                        placeholder={''}
                        value={profile?.name}
                        onChange={(e) => { }}
                        className="flex-1 border border-gray-300 rounded-md px-3 py-2"
                    />
                    <button className="border border-green-300 px-4 py-1 rounded-md">Change</button>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                    <p className="sm:w-20 font-medium capitalize">email</p>
                    <input
                        type={'text'}
                        placeholder={''}
                        value={user?.email}
                        onChange={(e) => { }}
                        className="flex-1 border border-gray-300 rounded-md px-3 py-2"
                    />
                    <button className="border border-green-300 px-4 py-1 rounded-md">Change</button>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                    <p className="sm:w-20 font-medium capitalize">password</p>
                    <input
                        type={'password'}
                        placeholder={''}
                        value={user?.password}
                        onChange={(e) => { }}
                        className="flex-1 border border-gray-300 rounded-md px-3 py-2"
                    />
                    <button className="border border-green-300 px-4 py-1 rounded-md">Change</button>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                    <p className="sm:w-20 font-medium capitalize">Phone</p>
                    <input
                        type={'text'}
                        placeholder={''}
                        value={profile?.contact?.[0] || ''}
                        onChange={(e) => { }}
                        className="flex-1 border border-gray-300 rounded-md px-3 py-2"
                    />
                    <button className="border border-green-300 px-4 py-1 rounded-md">Change</button>
                </div>
            </div>
        </div>
    )
}

export default StaysAccount