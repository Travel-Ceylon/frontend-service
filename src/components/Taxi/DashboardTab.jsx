import React, { useState } from "react";
import Checkbox from "../Checkbox";
import EditTaxiModal from "./editTaxiModal";

export const DashboardTab = ({ profile }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  if (!profile) {
    return (
      <p className="text-center py-10 text-gray-600">
        Loading taxi profile details...
      </p>
    );
  }

  const { images, description, driverBio, city } = profile;

  return (
    <div className="max-w-screen xl:mx-18 mx-8 px-4 sm:px-8 py-4 bg-white rounded-md">
      {/* Vehicle images appear here*/}
      <section className="mb-4 ">
        <div className="flex justify-between items-center">
          <h2 className="text-sm sm:text-lg  font-semibold mb-4 text-gray-600">
            Images
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {/* Main large image */}
          {images && images[0] && (
            <div className="col-span-2 row-span-2">
              <img
                src={images[0]}
                alt="Main vehicle view"
                className="w-full h-32 sm:h-96 object-cover rounded-lg"
              />
            </div>
          )}
          {/* Smaller thumbnail images */}
          {images &&
            images.slice(1, 5).map((img, index) => (
              <div key={index} className="aspect-square">
                <img
                  src={img}
                  alt={`Vehicle view ${index + 2}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
              </div>
            ))}
        </div>
      </section>

      {/* Vehicle description */}
      <section className="mb-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-sm sm:text-lg font-semibold text-gray-600">
            Description
          </h2>
        </div>
        <p className="text-gray-700 text-xs sm:text-sm leading-relaxed border border-gray-200 p-3 rounded-md">
          {description ||
            "Well maintained 7 Seater super offerss and air conditioned. Comfort and style together to make their trip most exciting. Fuel efficient and therefore, You can easily travel to any destination of your choice without worrying about the cost and maintenance while staying with our reliable service for 24 hours. Our brand new model will let you travel to any part of the country and let you explore with your own accord."}
        </p>
      </section>

      {/* City */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-sm sm:text-lg font-semibold text-gray-600">
            About the Driver
          </h2>
        </div>
        <div className=" ">
          <div className="border border-gray-200 p-3 w-full rounded-md">
            <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
              {driverBio ||
                "I have extensive experience as a professional driver and I am currently willing to make my passengers' journeys more comfortable, happier and safer. I am a person who communicates easily with all the passengers who travel with me and I would like to provide a friendly and reliable service while helping you explore the country."}
            </p>
          </div>
        </div>
      </section>
      <section className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-sm sm:text-lg font-semibold text-gray-600">
            City
          </h2>
        </div>
        <div className=" ">
          <div className="border border-gray-200 p-3 w-full rounded-md">
            <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
              {city}
            </p>
          </div>
        </div>
      </section>
      <div
        onClick={() => setIsModalOpen(true)}
        className="flex items-center justify-center py-1 text-white bg-green-400 rounded-md cursor-pointer "
      >
        <button className="px-2 py-2 text-sm font-medium  cursor-pointer">
          Edit Details
        </button>
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
      </div>
      {/* Edit modal  */}
      <EditTaxiModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
