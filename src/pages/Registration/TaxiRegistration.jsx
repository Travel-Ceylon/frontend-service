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

  // Navigation functions to jump from next,previous

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

  // Handle submit

  const handleSubmit = async () => {
    try {
      // Call submit function from store
      await submit();

      toast.success("Successfully registered");
      navigate("/profile/taxi");
    } catch (error) {
      toast.error(error?.message || "Registration failed");
    }
  };

  return (
    <div>
      {/* Header */}
      <h3 className="text-3xl font-bold text-center mt-12">
        Travel<span className="text-green-400">Ceylon</span>
      </h3>

      {/* Step 1: Owner Information */}
      {currentIndex === 0 && (
        <>
          <p className="text-gray-600 text-center mt-1">Owner Information</p>
          <StepOne />
        </>
      )}

      {/* Step 2: Contact & Pricing */}
      {currentIndex === 1 && (
        <>
          <p className="text-gray-600 text-center mt-1">Contact & Pricing</p>
          <StepTwo />
        </>
      )}

      {/* Step 3: Vehicle Information */}
      {currentIndex === 2 && (
        <>
          <p className="text-gray-600 text-center mt-1">Vehicle Information</p>
          <StepThree />
        </>
      )}

      {/* Step 4: Vehicle Images */}
      {currentIndex === 3 && (
        <>
          <p className="text-gray-600 text-center mt-1">Vehicle Images</p>
          <StepFour />
        </>
      )}

      {/* Navigation Buttons */}
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

// STEP ONE: Provider information collecting

const StepOne = () => {
  const {
    driverName,
    driverBio,
    nic,
    drivingId,
    setDriverName,
    setNic,
    setDrivingId,
    setNicImg,
    setDrivingIdImg,
    setProfilePic,
    setDriverBio,
  } = useTaxiStore();

  return (
    <div className="xl:max-w-xl xl:p-0 p-4 w-full mx-auto my-8 space-y-6">
      {/* Driver Profile Picture */}
      <div>
        <p className="mb-2">Driver Profile Picture</p>
        <ImageUploader setImage={setProfilePic} />
      </div>

      {/* Driver Name */}
      <div>
        <p>What is the Driver Name?</p>
        <CustomInput
          label="Driver Name"
          value={driverName}
          onChange={(e) => setDriverName(e.target.value)}
        />
      </div>

      {/* Driver Bio */}
      <div>
        <p>Tell us a little about the driver (bio)</p>
        <CustomInput
          label="Driver Biography (e.g., experience, professionalism)"
          value={driverBio}
          onChange={(e) => setDriverBio(e.target.value)}
          isTextArea={true}
        />
      </div>

      {/* Identification Numbers */}
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

      {/* ID Card Images */}
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

// Step 02: Collects contact details and pricing information

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
      {/* Contact Numbers */}
      <div>
        <p>Your contact Numbers?</p>
        <div className="grid grid-cols-2 gap-4">
          <CustomInput
            label="Number 1"
            value={contact1}
            onChange={(e) => setContact1(e.target.value)}
          />
          <CustomInput
            label="Number 2 (Optional)"
            value={contact2}
            onChange={(e) => setContact2(e.target.value)}
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <p>Setup Your Email</p>
        <CustomInput
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* Website */}
      <div>
        <p>Website (Optional)</p>
        <CustomInput
          label="Website link"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      {/* Price per KM */}
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

// Step 3: Collects vehicle specifications and registration details

const StepThree = () => {
  const {
    vehicleType,
    description,
    chasyNo,
    vehicleNo,
    province,
    model,
    city,
    fuelType,
    setFuelType,
    setVehicleType,
    setChasyNo,
    setVehicleNo,
    setProvince,
    setDescription,
    setModel,
    setCity,
  } = useTaxiStore();

  const vehicleTypes = ["Car", "Van", "Bus", "Tuk Tuk"];
  const FUEL_TYPES = ["Petrol", "Diesel", "Hybrid", "Electric"];

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
  const districts = [
    "Colombo",
    "Gampaha",
    "Kalutara",
    "Kandy",
    "Matale",
    "Nuwara Eliya",
    "Galle",
    "Matara",
    "Hambantota",
    "Jaffna",
    "Kilinochchi",
    "Mannar",
    "Mullaitivu",
    "Vavuniya",
    "Ampara",
    "Batticaloa",
    "Trincomalee",
    "Kurunegala",
    "Puttalam",
    "Anuradhapura",
    "Polonnaruwa",
    "Badulla",
    "Monaragala",
    "Ratnapura",
    "Kegalle",
  ];

  return (
    <div className="xl:max-w-xl xl:p-0 p-4 w-full mx-auto my-8 space-y-6">
      {/* Vehicle Type */}
      <div>
        <p>What is your vehicle type?</p>
        <CustomSelectbox
          label="Vehicle Type"
          options={vehicleTypes}
          value={vehicleType}
          onChange={(e) => setVehicleType(e.target.value)}
        />
      </div>

      {/* Vehicle Model */}
      <div>
        <p>What is your Vehicle Model</p>
        <CustomInput
          label="Vehicle Model (e.g., Toyota Prius)"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />
      </div>
      {/* District */}
      <div>
        <p>Fuel type?</p>
        <CustomSelectbox
          label="District"
          options={FUEL_TYPES}
          value={fuelType}
          onChange={(e) => setFuelType(e.target.value)}
        />
      </div>

      {/* Registration Numbers */}
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

      {/* Province */}
      <div>
        <p>What is the registered province?</p>
        <CustomSelectbox
          label="Province"
          options={provinces}
          value={province}
          onChange={(e) => setProvince(e.target.value)}
        />
      </div>
      {/* District */}
      <div>
        <p>What is your near by district?</p>
        <CustomSelectbox
          label="District"
          options={districts}
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>

      {/* Vehicle Description */}
      <div>
        <p>Vehicle Description</p>
        <CustomInput
          label="Add a brief description of the vehicle (e.g., AC, seats, luggage space)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          isTextArea={true}
        />
      </div>
    </div>
  );
};

// Step 4: Vehicle images section

const StepFour = () => {
  const { aggree, setAggree, setImage1, setImage2, setImage3 } = useTaxiStore();

  return (
    <div className="xl:max-w-xl xl:p-0 p-4 w-full mx-auto my-8 space-y-6">
      {/* Vehicle Images Upload */}
      <div>
        <p className="mb-2">Upload Images of Your Vehicle</p>
        <div className="space-y-6">
          <div>
            <p className="text-sm text-gray-600 mb-1">Image 1</p>
            <ImageUploader setImage={setImage1} />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Image 2</p>
            <ImageUploader setImage={setImage2} />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Image 3</p>
            <ImageUploader setImage={setImage3} />
          </div>
        </div>
      </div>

      {/* Terms and Conditions */}
      <Checkbox
        title="I agree to terms and conditions"
        checked={aggree}
        onChange={(e) => setAggree(e.target.checked)}
      />
    </div>
  );
};
