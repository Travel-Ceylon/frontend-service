import React, { useState, useEffect } from "react";
import { Upload, Home } from "lucide-react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import BookingDashboard from "../components/BookingDashboard";

const GuideAdmin = () => {
  const { id } = useParams();
  const guideId = id || "3";

  const [guide, setGuide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  return (
    <>
      <div className="w-full">
        {/* Cover Photo Section */}
        <div className="relative h-48 sm:h-64 lg:h-80 w-full">
          <img
            src={guide.coverImage || ""}
            alt="Cover"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 400'%3E%3Crect fill='%234f46e5' width='1200' height='400'/%3E%3Ctext x='600' y='200' text-anchor='middle' dy='.3em' fill='white' font-size='24'%3ECover Image%3C/text%3E%3C/svg%3E";
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>

          {/* Header Navigation */}
          <div className="absolute top-0 right-0 left-0 p-4 sm:p-6">
            <div className="flex items-center justify-end">
              <Link to="/" className="flex items-center text-white">
                <Home className="w-6 h-6" />
              </Link>
              <div className="flex items-center space-x-3 text-white mx-6">
                <img
                  src={guide.profileImage || ""}
                  alt="Admin"
                  className="w-8 h-8 rounded-full border border-white"
                  onError={(e) => {
                    e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect fill='%236b7280' width='32' height='32' rx='16'/%3E%3Ctext x='16' y='16' text-anchor='middle' dy='.3em' fill='white' font-size='14'%3E${guide.name.charAt(
                      0
                    )}%3C/text%3E%3C/svg%3E`;
                  }}
                />
                <span className="text-sm font-medium">taxiAdmin</span>
              </div>
            </div>
          </div>

          {/* Upload Cover Button */}
          <label className="absolute bottom-5 right-5 cursor-pointer bg-green-300 hover:bg-green-700 hover:text-white text-black px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors shadow-lg">
            <Upload className="w-4 h-4" />
            <span className="text-sm font-medium">Upload new cover</span>
            <input type="file" className="hidden" onChange={handleCoverUpload} />
          </label>
        </div>

        {/* Profile Section */}
        <div className="bg-white px-4 sm:px-6 lg:px-8 mb-4">
          <div className="relative -mt-12 sm:-mt-6 lg:-mt-16 pb-6 px-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-end space-y-4 sm:space-y-0 sm:space-x-6">
              {/* Profile Image */}
              <div className="relative">
                <img
                  src={guide.profileImage || ""}
                  alt={guide.name}
                  className="w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full border-4 border-white shadow-lg object-cover"
                  onError={(e) => {
                    e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 144 144'%3E%3Crect fill='%236b7280' width='144' height='144' rx='72'/%3E%3Ctext x='72' y='72' text-anchor='middle' dy='.3em' fill='white' font-size='48'%3E${guide.name.charAt(
                      0
                    )}%3C/text%3E%3C/svg%3E`;
                  }}
                />
                <div className="absolute inset-0 rounded-full ring-4 ring-white"></div>
              </div>

              {/* Profile Info */}
              <div className="pb-2 flex-1">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1">{guide.name}</h1>
                <p className="text-lg sm:text-xl text-gray-600 font-medium">
                  {`${guide.city || ""}, ${guide.district || ""}, ${guide.province || ""}`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BookingDashboard guideId={guideId} />
    </>
  );
};

export default GuideAdmin;
