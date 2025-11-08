import React from "react";
import CustomInput from "../../components/CustomInput";
import ImageUploader from "../../components/ImageUploader";
import Checkbox from "../../components/Checkbox";
import CustomSelectbox from "../../components/CustomSelectbox";
import { useNavigate } from "react-router-dom";
import { useTaxiStore } from "../../store/taxiStore";
import { toast } from "react-hot-toast";

function TaxiRegistration() {
  const navigate = useNavigate();

  const { currentIndex, setCurrentIndex, submit } = useTaxiStore();

  const nextStep = () => {
    if (currentIndex === 3) return;
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
      navigate("/profile/taxi");
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
          <p className="text-gray-600 text-center mt-2">Owner Information</p>
          <StepOne />
        </>
      )}

      {currentIndex === 1 && (
        <>
          <p className="text-gray-600 text-center mt-2">Contact & Pricing</p>
          <StepTwo />
        </>
      )}

      {currentIndex === 2 && (
        <>
          <p className="text-gray-600 text-center mt-2">Vehicle Information</p>
          <StepThree />
        </>
      )}

      {currentIndex === 3 && (
        <>
          <p className="text-gray-600 text-center mt-2">Vehicle Images</p>
          <StepFour />
        </>
      )}

      <div className="flex justify-center gap-6 items-center mb-32">
        <button
          className="px-12 py-2 rounded-md bg-green-400 text-white hover:bg-green-500 cursor-pointer"
          onClick={prevStep}
        >
          Back
        </button>

        {currentIndex !== 3 && (
          <button
            className="px-12 py-2 rounded-md bg-green-400 text-white hover:bg-green-500 cursor-pointer"
            onClick={nextStep}
          >
            Next
          </button>
        )}

        {currentIndex === 3 && (
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

export default TaxiRegistration;

//
// ---------- STEP COMPONENTS ----------
//

const StepOne = () => {
  const {
    driverName,
    nic,
    drivingId,
    setDriverName,
    setNic,
    setDrivingId,
    setNicImg,
    setDrivingIdImg,
  } = useTaxiStore();

  return (
    <div className="xl:max-w-xl xl:p-0 p-4 w-full mx-auto my-8 space-y-6">
      <div>
        <p>What is the Driver Name?</p>
        <CustomInput
          label="Driver Name"
          value={driverName}
          onChange={(e) => setDriverName(e.target.value)}
        />
      </div>

      <div>
        <p>Identification Numbers</p>
        <div className="grid grid-cols-2 gap-4">
          <CustomInput
            label="NIC Number"
            value={nic}
            onChange={(e) => setNic(e.target.value)}
          />
          <CustomInput
            label="Licence Number"
            value={drivingId}
            onChange={(e) => setDrivingId(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="mb-2">NIC Card</p>
          <ImageUploader setImage={setNicImg} />
        </div>
        <div>
          <p className="mb-2">Driving Licence Card</p>
          <ImageUploader setImage={setDrivingIdImg} />
        </div>
      </div>
    </div>
  );
};

const StepTwo = () => {
  const {
    contact1,
    contact2,
    email,
    website,
    perKm,
    setContact1,
    setContact2,
    setEmail,
    setWebsite,
    setPerKm,
  } = useTaxiStore();

  return (
    <div className="xl:max-w-xl xl:p-0 p-4 w-full mx-auto my-8 space-y-6">
      <div>
        <p>Your contact Numbers?</p>
        <div className="grid grid-cols-2 gap-4">
          <CustomInput
            label="Number 1"
            value={contact1}
            onChange={(e) => setContact1(e.target.value)}
          />
          <CustomInput
            label="Number 2"
            value={contact2}
            onChange={(e) => setContact2(e.target.value)}
          />
        </div>
      </div>

      <div>
        <p>Setup Your Email</p>
        <CustomInput
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <p>Website (Optional)</p>
        <CustomInput
          label="Website link"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div>
        <p>Price per KM</p>
        <CustomInput
          label="Per KM"
          type="number"
          value={perKm}
          onChange={(e) => setPerKm(e.target.value)}
        />
      </div>
    </div>
  );
};

const StepThree = () => {
  const {
    vehicleType,
    chasyNo,
    vehicleNo,
    province,
    location,
    setVehicleType,
    setChasyNo,
    setVehicleNo,
    setProvince,
    setLocation,
  } = useTaxiStore();

  const vehicleTypes = ["Car", "Van", "Bus", "Three Wheeler"];
  const provinces = [
    "Western",
    "Central",
    "Southern",
    "Northern",
    "Eastern",
    "North Western",
    "North Central",
    "Uva",
    "Sabaragamuwa",
  ];

  return (
    <div className="xl:max-w-xl xl:p-0 p-4 w-full mx-auto my-8 space-y-6">
      <div>
        <p>What is your vehicle type?</p>
        <CustomSelectbox
          label="Vehicle Type"
          options={vehicleTypes}
          value={vehicleType}
          onChange={(e) => setVehicleType(e.target.value)}
        />
      </div>

      <div>
        <p>What is your Vehicle Model</p>
        <CustomInput
          label="Vehicle Model"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div>
        <p>Vehicle Registration Numbers</p>
        <div className="grid grid-cols-2 gap-4">
          <CustomInput
            label="Vehicle Number"
            value={vehicleNo}
            onChange={(e) => setVehicleNo(e.target.value)}
          />
          <CustomInput
            label="Chassis Number"
            value={chasyNo}
            onChange={(e) => setChasyNo(e.target.value)}
          />
        </div>
      </div>

      <div>
        <p>What is the Registered Province?</p>
        <CustomSelectbox
          label="Province"
          options={provinces}
          value={province}
          onChange={(e) => setProvince(e.target.value)}
        />
      </div>
    </div>
  );
};

const StepFour = () => {
  const { aggree, setAggree,setImage1,setImage2,setImage3 } = useTaxiStore();

  return (
    <div className="xl:max-w-xl xl:p-0 p-4 w-full mx-auto my-8 space-y-6">
      <div>
        <p className="mb-2">Upload Images of Your Vehicle</p>
        <div className="space-y-6">
          <ImageUploader setImage={setImage1} />
          <ImageUploader setImage={setImage2} />
          <ImageUploader setImage={setImage3} />
        </div>
      </div>

      <Checkbox
        title="I agree to terms and conditions"
        checked={aggree}
        onChange={(e) => setAggree(e.target.checked)}
      />
    </div>
  );
};
