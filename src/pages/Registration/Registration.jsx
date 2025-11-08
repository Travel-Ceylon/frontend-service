import { useNavigate } from 'react-router-dom';
import { Bed, Car, User } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useEffect } from 'react';

function Registration() {
  const navigate = useNavigate();

  const {user} = useAuthStore();

  useEffect(()=>{
    if(!user){
      navigate("/")
    }
  },[user])

  return (
    <div
      className="min-h-screen w-full flex flex-col justify-start items-center"
    >
      {/* Logo and intro */}
      <div className="pt-28 px-5 text-center w-full max-w-6xl">
        <h1 className='text-4xl font-semibold mb-4 text-black'>Travel<span className='text-green-400'>Ceylon</span></h1>
        <p className="text-base text-black/80 mb-10">
          Welcome! Please select your category to begin the registration process.
        </p>
      </div>

      {/* Registration cards */}
      <div className="flex flex-wrap justify-center gap-8 px-5 w-full max-w-6xl">
        {/* Hotel & Stays */}
        <div className="bg-white rounded-lg shadow-lg p-8 w-[200px] text-center transition-transform duration-200 hover:scale-105">
          <Bed className="h-[50px] w-[50px] mx-auto text-[#1C1B1F] mb-3" />
          <p className="text-black text-sm mb-4">Hotel & Stays</p>
          <button
            className="bg-green-400 w-full py-2 rounded-md text-white text-sm font-medium hover:bg-green-500"
            onClick={() => navigate('/registration/hotel')}
          >
            Register Now
          </button>
        </div>

        {/* Taxi & Transport */}
        <div className="bg-white rounded-lg shadow-lg p-8 w-[200px] text-center transition-transform duration-200 hover:scale-105">
          <Car className="h-[50px] w-[50px] mx-auto text-[#1C1B1F] mb-3" />
          <p className="text-black text-sm mb-4">Taxi & Transport</p>
          <button
            className="bg-green-400 w-full py-2 rounded-md text-white text-sm font-medium hover:bg-green-500"
            onClick={() => navigate('/registration/taxi')}
          >
            Register Now
          </button>
        </div>

        {/* Tour Guide */}
        <div className="bg-white rounded-lg shadow-lg p-8 w-[200px] text-center transition-transform duration-200 hover:scale-105">
          <User className="h-[50px] w-[50px] mx-auto text-[#1C1B1F] mb-3" />
          <p className="text-black text-sm mb-4">Tour Guide</p>
          <button
            className="bg-green-400 w-full py-2 rounded-md text-white text-sm font-medium hover:bg-green-500"
            onClick={() => navigate('/registration/guide')}
          >
            Register Now
          </button>
        </div>
      </div>

    </div>
  );
}

export default Registration;
