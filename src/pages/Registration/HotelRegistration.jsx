import React from 'react';
import CustomInput from "../../components/CustomInput";
import ImageUploader from '../../components/ImageUploader';
import Checkbox from "../../components/Checkbox";
import { useNavigate } from "react-router-dom";
import { useHotelStore } from '../../store/hotelStore';
import { toast } from "react-hot-toast";

function GuideRegistration() {
  const navigate = useNavigate();

  const { currentIndex, setCurrentIndex, submit } = useHotelStore();

  const nextStep = () => {
    if (currentIndex === 4) return;
    setCurrentIndex(currentIndex + 1);
  };

  const prevStep = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      navigate("/registration");
    }
  };

  const handleSubmit = async () => {
    try {
      await submit();
      toast.success("Successfully registered");
      navigate("/profile/stays");
    } catch (error) {
      toast.error(error?.message);
    }
  };

  return (
    <div>
      <h3 className="text-4xl font-semibold text-center mt-12">
        Travel<span className="text-green-400">Ceylon</span>
      </h3>

      {currentIndex === 0 && (
        <>
          <p className="text-gray-600 text-center mt-2">Basic Information</p>
          <StepOne />
        </>
      )}

      {currentIndex === 1 && (
        <>
          <p className="text-gray-600 text-center mt-2">Professional Information</p>
          <StepTwo />
        </>
      )}

      {currentIndex === 2 && (
        <>
          <p className="text-gray-600 text-center mt-2">Facilities Information</p>
          <StepThree />
        </>
      )}

      {currentIndex === 3 && (
        <>
          <p className="text-gray-600 text-center mt-2">Facilities Information</p>
          <StepFour />
        </>
      )}


      {currentIndex === 4 && (
        <>
          <p className="text-gray-600 text-center mt-2">Hotel Images</p>
          <StepFive />
        </>
      )}

      <div className="flex justify-center gap-6 items-center mb-32">
        <button
          className="px-12 py-2 rounded-md bg-green-400 text-white hover:bg-green-500 cursor-pointer"
          onClick={prevStep}
        >
          Back
        </button>

        {currentIndex !== 4 && (
          <button
            className="px-12 py-2 rounded-md bg-green-400 text-white hover:bg-green-500 cursor-pointer"
            onClick={nextStep}
          >
            Next
          </button>
        )}

        {currentIndex === 4 && (
          <button
            className="px-12 py-2 rounded-md bg-green-400 text-white hover:bg-green-500 cursor-pointer"
            onClick={handleSubmit}
          >
            Finish
          </button>
        )}
      </div>
    </div>
  );
}

export default GuideRegistration;

//
// ---------- STEP COMPONENTS ----------
//

const StepOne = () => {
  const { name, location, setName, setLocation } = useHotelStore();

  return (
    <div className="xl:max-w-xl xl:p-0 p-4 w-full mx-auto my-8 space-y-6">
      <div>
        <p>What is your hotel name?</p>
        <CustomInput label="Hotel Name" value={name || ""} onChange={(e) => setName(e.target.value)} />
        <p className="text-sm text-gray-600">People will see this name when searching</p>
      </div>

      <div>
        <p>Set your location</p>
        <CustomInput label="Add location" value={location || ""} onChange={(e) => setLocation(e.target.value)} />
      </div>
    </div>
  );
};

const StepTwo = () => {
  const { contact1, contact2, email, website, setContact1, setContact2, setEmail, setWebsite } = useHotelStore();

  return (
    <div className="xl:max-w-xl xl:p-0 p-4 w-full mx-auto my-8 space-y-6">
      <div>
        <p>Your contact Numbers?</p>
        <div className="grid grid-cols-2 gap-4">
          <CustomInput label="Number 1" value={contact1 || ""} onChange={(e) => setContact1(e.target.value)} />
          <CustomInput label="Number 2" value={contact2 || ""} onChange={(e) => setContact2(e.target.value)} />
        </div>
      </div>

      <div>
        <p>Setup Your Email</p>
        <CustomInput label="Email" value={email || ""} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div>
        <p>Add your website link (optional)</p>
        <CustomInput label="Website's link" value={website || ""} onChange={(e) => setWebsite(e.target.value)} />
      </div>
    </div>
  );
};

const StepThree = () => {
  const {
    breakfast,
    roomService,
    bar,
    fitnessCenter,
    garden,
    parking,
    familyRooms,
    freeWifi,
    airConditioning,
    spa,
    swimmingPool,
    waterPark,
    setBreakfast,
    setRoomService,
    setBar,
    setFitnessCenter,
    setGarden,
    setParking,
    setFamilyRooms,
    setFreeWifi,
    setAirConditioning,
    setSpa,
    setSwimmingPool,
    setWaterPark,
  } = useHotelStore();

  return (
    <div className="xl:max-w-xl xl:p-0 p-4 w-full mx-auto my-8 space-y-6">
      <p className="mb-6 text-lg">What are the facilities?</p>

      <div className="grid grid-cols-2 gap-4 bg-green-100 border border-gray-400 px-4 py-8 rounded-2xl">
        <div className="space-y-6">
          <Checkbox title="Breakfast" checked={breakfast} onChange={(e) => setBreakfast(e.target.checked)} />
          <Checkbox title="Room Service" checked={roomService} onChange={(e) => setRoomService(e.target.checked)} />
          <Checkbox title="Bar" checked={bar} onChange={(e) => setBar(e.target.checked)} />
          <Checkbox title="Fitness Center" checked={fitnessCenter} onChange={(e) => setFitnessCenter(e.target.checked)} />
          <Checkbox title="Garden" checked={garden} onChange={(e) => setGarden(e.target.checked)} />
          <Checkbox title="Parking" checked={parking} onChange={(e) => setParking(e.target.checked)} />
        </div>

        <div className="space-y-6">
          <Checkbox title="Family Rooms" checked={familyRooms} onChange={(e) => setFamilyRooms(e.target.checked)} />
          <Checkbox title="Free Wifi" checked={freeWifi} onChange={(e) => setFreeWifi(e.target.checked)} />
          <Checkbox title="Air Conditioning" checked={airConditioning} onChange={(e) => setAirConditioning(e.target.checked)} />
          <Checkbox title="Spa" checked={spa} onChange={(e) => setSpa(e.target.checked)} />
          <Checkbox title="Swimming Pool" checked={swimmingPool} onChange={(e) => setSwimmingPool(e.target.checked)} />
          <Checkbox title="Water Park" checked={waterPark} onChange={(e) => setWaterPark(e.target.checked)} />
        </div>
      </div>
    </div>
  );
};

const StepFour = () => {
  const { setCover, setProfilePic, cover, profilePic } = useHotelStore();

  return (
    <div className="xl:max-w-xl xl:p-0 p-4 w-full mx-auto my-8 space-y-6">

      <div className='space-y-4'>
        <div>
          <p className="mb-2">Upload Profile Picture</p>
          <ImageUploader setImage={setProfilePic} value={profilePic} />
        </div>
        <div>
          <p className="mb-2">Upload Cover Photo</p>
          <ImageUploader setImage={setCover} value={cover} />
        </div>

      </div>
    </div>
  )

}

const StepFive = () => {
  const { image1, image2, image3, aggree, setImage1, setImage2, setImage3, setAggree } = useHotelStore();

  return (
    <div className="xl:max-w-xl xl:p-0 p-4 w-full mx-auto my-8 space-y-6">
      <div>
        <p className="mb-2">Upload Images of Your Hotel</p>
        <div className="space-y-6">
          <ImageUploader setImage={setImage1} value={image1} />
          <ImageUploader setImage={setImage2} value={image2} />
          <ImageUploader setImage={setImage3} value={image3} />
        </div>
      </div>

      <Checkbox title="I agree to terms and conditions" checked={aggree} onChange={(e) => setAggree(e.target.checked)} />
    </div>
  );
};
