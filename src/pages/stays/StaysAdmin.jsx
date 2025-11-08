import React, { useEffect } from 'react';
import { LinkIcon, SquarePen } from 'lucide-react';
import { useHotelStore } from '../../store/hotelStore';
import LoadingScreen from '../../components/LoadingScreen';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';


function StaysAdmin() {

  const {
    loadProfile,
    profile,
    isFetching
  } = useHotelStore();

  console.log(profile)

  const { pathname } = useLocation();
  const activeTab = pathname.split("/")[3];

  const navigate = useNavigate();

  useEffect(() => {
    loadProfile()
  }, [])

  if (isFetching) {
    return (
      <LoadingScreen />
    )
  }

  return (
    <>
      <div className="pb-24">
        {/* Background Header */}
        <div
          style={{
            backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url(${profile?.cover})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
          className="relative h-80 z-10"
        >
          <button className='p-2 rounded-md bg-green-300 absolute bottom-2 right-2 z-20 cursor-pointer'>
            <SquarePen className='size-6' />
          </button>
        </div>

        {/* Profile Info */}
        <div className="z-20 md:ml-8 -mt-20 flex md:flex-row flex-col gap-1 md:items-center w-fit mx-auto text-center md:text-left">
          <img src={profile?.profilePic}
            className="size-44 object-center z-20 object-cover rounded-full border-4
           border-white bg-black" alt="User" />
          <div className="md:mt-22 mt-1">
            <h2 className="text-2xl font-semibold">{profile?.name}</h2>
            <p className="text-lg text-black/70">{profile?.location}</p>

            {profile?.website &&
              (
                <div className='space-x-1'>
                  <LinkIcon className='inline size-5' />
                  <a href={`https://${profile.website}`} target='_blank' className="text-base font-semibold text-blue-800/80 ">{profile.website}</a>
                </div>
              )
            }

          </div>
        </div>

        {/* Tabs */}
        <div className="md:mx-8 mx-4 md:mt-8 mt-4">
          <div className="flex items-center justify-evenly bg-white px-4 py-5 rounded-xl border border-gray-200">
            {
              [{ name: 'Bookings', path: 'bookings' },
              { name: 'Dashboard', path: undefined },
              { name: 'Account', path: 'account' }].map(tab => (
                <div
                  key={tab.name}
                  onClick={
                    () => {
                      if (tab.path === undefined) {
                        navigate('/profile/stays')
                      }
                      else {
                        navigate(tab.path)
                      }

                    }}
                  className="flex flex-col items-center cursor-pointer px-2"
                >
                  <h3 className={`text-lg font-medium ${activeTab === tab.path ? 'text-black' : 'text-gray-500'}`}>{tab.name}</h3>
                  <div className={`h-1 w-full mt-1 rounded-full transition-all duration-300 ${activeTab === tab.path ? 'bg-green-300' : 'bg-transparent'}`} />
                </div>
              ))}
          </div>

          <Outlet />

        </div>
      </div>
    </>
  );
}

export default StaysAdmin;
