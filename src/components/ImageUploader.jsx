import React, { useRef, useState } from "react";
import { ImagePlus } from "lucide-react";
import axios from "axios";

function ImageUploader({ setImage }) {
  const imageRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);

  const handleClick = () => {
    imageRef.current?.click();
  };

  // prevent web browser opens the file in a new tab
  const handleDragOver = (e) => {
    e.preventDefault(); // must preventDefault so drop works
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false); // remove highlight
  };

  const handleDrop = async (e) => {
    e.preventDefault(); // prevent browser from opening the file
    const droppedFile = e.dataTransfer.files[0]; // get first file

    if (!droppedFile) {
      return null;
    }
    await handleUpload(droppedFile);
  };

  const handleChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) {
      return null;
    }
    await handleUpload(selectedFile);
  };

  const handleUpload = async (selectedFile) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("my_file", selectedFile);

      const url = import.meta.env.VITE_BASE_URL;
      const { data } = await axios.post(`${url}/api/upload`, formData);
      setPreview(data?.secure_url);
      setImage(data?.secure_url);
      setUploading(false);
    } catch (error) {
      setUploading(false);
      console.log(error);
    }
  };

  return (
    <div>
      <div
        className={`bg-green-100 rounded-md flex items-center shadow-sm
                justify-center cursor-pointer overflow-hidden border
                ${dragging ? "border-green-400" : "border-green-200"}`}
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          type="file"
          ref={imageRef}
          className="hidden"
          accept="image/*"
          onChange={handleChange}
        />

        {!uploading ? (
          preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-72 h-52 object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-5 w-full h-48">
              <ImagePlus size={32} className="text-green-300" />
              <p className="text-base text-gray-700 font-semibold text-center">
                Drag and Drop or upload
              </p>
              <p className="text-sm text-gray-600 text-center">
                JPG/JPEG or PNG maximum size 10MB.
              </p>
            </div>
          )
        ) : (
          <div className="flex flex-col items-center justify-center p-5 w-full h-48 animate-pulse">
            <p className="text-lg text-green-400">Uploading...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageUploader;
