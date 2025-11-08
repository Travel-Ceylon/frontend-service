import React, { useState } from 'react';
import CustomInput from "../../components/CustomInput";
import ImageUploader from '../../components/ImageUploader';
import Checkbox from "../../components/Checkbox";
import CustomSelectbox from "../../components/CustomSelectbox";
import { useNavigate } from "react-router-dom";
import { useGuideStore } from '../../store/guideStore';
import { toast } from "react-hot-toast"

const options = {
  "Select": {},
  Western: {
    Colombo: ["Colombo", "Dehiwala–Mount Lavinia", "Moratuwa", "Sri Jayawardenepura Kotte", "Maharagama", "Kesbewa", "Kolonnawa", "Homagama", "Pannipitiya"],
    Gampaha: ["Negombo", "Gampaha", "Wattala", "Minuwangoda", "Kadawatha", "Ja-Ela", "Kelaniya", "Ragama", "Divulapitiya", "Kiribathgoda"],
    Kalutara: ["Kalutara", "Panadura", "Horana", "Beruwala", "Wadduwa", "Bandaragama", "Matugama", "Aluthgama"]
  },
  Central: {
    Kandy: ["Kandy", "Gampola", "Nawalapitiya", "Katugastota", "Peradeniya", "Akuranboda", "Pilimathalawa", "Kadugannawa"],
    Matale: ["Matale", "Dambulla", "Sigiriya", "Palapathwela", "Ukuwela"],
    "Nuwara Eliya": ["Nuwara Eliya", "Hatton", "Talawakelle", "Ginigathena"]
  },
  Southern: {
    Galle: ["Galle", "Ambalangoda", "Hikkaduwa", "Baddegama", "Balapitiya", "Ahangama", "Unawatuna", "Elpitiya"],
    Matara: ["Matara", "Weligama", "Hakmana", "Akuressa", "Devinuwara", "Deniyaya", "Kamburupitiya"],
    Hambantota: ["Hambantota", "Tangalle", "Ambalantota", "Beliatta", "Tissamaharama", "Kataragama"]
  },
  Eastern: {
    Ampara: ["Kalmunai", "Ampara", "Akkaraipattu", "Sammanthurai", "Maha Oya", "Pottuvil", "Dehiattakandiya"],
    Batticaloa: ["Batticaloa", "Eravur", "Kattankudy", "Vakarai", "Chenkalady"],
    Trincomalee: ["Trincomalee", "Kinniya", "Mutur", "Nilaveli"]
  },
  "North Western": {
    Kurunegala: ["Kurunegala", "Kuliyapitiya", "Narammala", "Ibbagamuwa", "Polgahawela", "Giriulla", "Wariyapola", "Dambadeniya"],
    Puttalam: ["Puttalam", "Chilaw", "Wennappuwa", "Dankotuwa", "Marawila", "Kalpitiya", "Anamaduwa"]
  },
  "North Central": {
    Anuradhapura: ["Anuradhapura", "Kekirawa", "Medawachchiya", "Mihintale", "Tambuttegama", "Galenbindunuwewa"],
    Polonnaruwa: ["Polonnaruwa", "Kaduruwela", "Hingurakgoda", "Medirigiriya", "Aralaganwila"]
  },
  Uva: {
    Badulla: ["Badulla", "Bandarawela", "Haputale", "Welimada", "Diyatalawa", "Mahiyanganaya", "Passara"],
    Moneragala: ["Moneragala", "Wellawaya", "Buttala", "Kataragama", "Bibila"]
  },
  Sabaragamuwa: {
    Kegalle: ["Kegalle", "Ruwanwella", "Mawanella", "Warakapola", "Dehiowita", "Yatiyantota", "Rambukkana"],
    Ratnapura: ["Ratnapura", "Balangoda", "Embilipitiya", "Pelmadulla", "Opanayake"]
  },
  Northern: {
    Jaffna: ["Jaffna", "Chavakachcheri", "Point Pedro", "Valvedditturai", "Kayts", "Manipay"],
    Kilinochchi: ["Kilinochchi", "Pallai", "Poonakary", "Paranthan"],
    Mannar: ["Mannar", "Madhu", "Adampan"],
    Mullaitivu: ["Mullaitivu", "Puthukkudiyiruppu"],
    Vavuniya: ["Vavuniya", "Omanthai"]
  }
};


function GuideRegistration() {
  const navigate = useNavigate();

  const {
    currentIndex,
    setCurrentIndex,
    submit
  } = useGuideStore();

  const nextStep = () => {
    if (currentIndex === 2) {
      return;
    }
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
      navigate("/profile/guide")
    } catch (error) {
      return null;
    }
  }

  return (
    <div>
      <h3 className='text-4xl font-semibold text-center mt-12'>
        Travel<span className='text-green-400'>Ceylon</span>
      </h3>
      
      {currentIndex === 0 && (
        <>
          <p className='text-gray-600 text-center mt-2'>Personal Information</p>
          <StepOne />
        </>

      )}

      {currentIndex === 1 && (
        <>
          <p className='text-gray-600 text-center mt-2'>Profesional Information</p>
          <StepTwo />
        </>

      )}

      {currentIndex === 2 && (
        <>
          <p className='text-gray-600 text-center mt-2'>Documents Information</p>
          <StepThree />
        </>
      )}

      <div className='flex justify-center gap-6 items-center mb-32'>
        <button
          className='px-12 py-2 rounded-md bg-green-400 text-white hover:bg-green-500 cursor-pointer'
          onClick={prevStep}
        >
          Back
        </button>

        {currentIndex !== 2 && (
          <button
            className='px-12 py-2 rounded-md bg-green-400 text-white hover:bg-green-500 cursor-pointer'
            onClick={nextStep}
          >
            Next
          </button>
        )}

        {currentIndex === 2 && (
          <button
            className='px-12 py-2 rounded-md bg-green-400 text-white hover:bg-green-500 cursor-pointer'
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

// --------- STEP COMPONENTS ----------

const StepOne = () => {

  const {
    name,
    nic,
    contact1,
    contact2,
    email,
    setName,
    setNic,
    setContact1,
    setContact2,
    setEmail,
    setProfilePic,
  } = useGuideStore();

  return (
    <div className='xl:max-w-xl xl:p-0 p-4 w-full mx-auto my-8 space-y-6'>
      <div>
        <p>What is your Name?</p>
        <CustomInput label="Full Name" value={name} onChange={e => setName(e.target.value)} />
        <p className='text-sm text-gray-600'>People will see this name when searching</p>
      </div>

      <div>
        <p>What is your NIC Number?</p>
        <CustomInput label="NIC Number" value={nic} onChange={e => setNic(e.target.value)} />
      </div>

      <div>
        <p>Your contact Numbers?</p>
        <div className='grid grid-cols-2 gap-4'>
          <CustomInput label="Number 1" value={contact1} onChange={e => setContact1(e.target.value)} />
          <CustomInput label="Number 2" value={contact2} onChange={e => setContact2(e.target.value)} />
        </div>
      </div>

      <div>
        <p>Setup Your Email</p>
        <CustomInput label="Email" value={email} onChange={e => setEmail(e.target.value)} />
      </div>

      <div>
        <p className='mb-2'>Upload Profile Picture</p>
        <ImageUploader setImage={setProfilePic} />
        <p className='text-sm text-gray-600 mt-2'>Upload clear portrait image</p>
      </div>
    </div>
  );
}
const StepTwo = () => {
  const {
    province,
    district,
    city,
    english,
    sinhala,
    french,
    german,
    tamil,
    wildLife,
    history,
    adventure,
    price,
    setProvince,
    setDistrict,
    setCity,
    setEnglish,
    setSinhala,
    setFrench,
    setGerman,
    setTamil,
    setHistory,
    setWildLife,
    setAdventure,
    setPrice,
  } = useGuideStore();


  const provinces = Object.keys(options) || [];
  const districts = province ? Object.keys(options[province]) : [];
  const cities = district ? options[province][district] : [];

  return (
    <div className='xl:max-w-xl xl:p-0 p-4 w-full mx-auto my-8 space-y-6'>
      <div>
        <p>What Are the languages do you prefer?</p>
        <div className='space-y-3 mt-4'>
          <Checkbox title="English" checked={english} onChange={e => setEnglish(e.target.checked)} />
          <Checkbox title="French" checked={french} onChange={e => setFrench(e.target.checked)} />
          <Checkbox title="German" checked={german} onChange={e => setGerman(e.target.checked)} />
          <Checkbox title="Sinhala" checked={sinhala} onChange={e => setSinhala(e.target.checked)} />
          <Checkbox title="Tamil" checked={tamil} onChange={e => setTamil(e.target.checked)} />
        </div>
      </div>

      <div>
        <p>What is your Specializations?</p>
        <div className='space-y-3 mt-4'>
          <Checkbox title="History and Ancient things" checked={history} onChange={e => setHistory(e.target.checked)} />
          <Checkbox title="Wildlife safaris" checked={wildLife} onChange={e => setWildLife(e.target.checked)} />
          <Checkbox title="Eco-Adventure Guide" checked={adventure} onChange={e => setAdventure(e.target.checked)} />
        </div>
      </div>

      <div>
        <div className='grid grid-cols-3 gap-4'>
          <CustomSelectbox label="Province" options={provinces} value={province} onChange={e => setProvince(e.target.value)} />
          <CustomSelectbox label="District" options={districts} value={district} onChange={e => setDistrict(e.target.value)} />
          <CustomSelectbox label="City" options={cities} value={city} onChange={e => setCity(e.target.value)} />
        </div>
      </div>

      <div>
        <p>Charges for a Day (LKR)</p>
        <CustomInput label="Price" type="number" value={price} onChange={e => setPrice(e.target.value)} />
      </div>
    </div>
  );
};

const StepThree = () => {

  const {
    setGuideLicenceImg,
    setPoliceClearanceImg,
    aggree,
    setAggree
  } = useGuideStore();

  return (
    <div className='xl:max-w-xl xl:p-0 p-4 w-full mx-auto my-8 space-y-6'>
      <div>
        <p className='mb-2'>Add Guide License (SLTDA certification)</p>
        <ImageUploader setImage={setGuideLicenceImg} />
      </div>

      <div>
        <p className='mb-2'>Police Clearance Certificate</p>
        <ImageUploader setImage={setPoliceClearanceImg} />
      </div>

      <Checkbox title="I agree to terms and conditions" checked={aggree} onChange={e => setAggree(e.target.checked)} />
    </div>
  )
}
