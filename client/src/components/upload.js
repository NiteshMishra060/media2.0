// src/App.js
import React, { useState } from 'react';
import axios from 'axios';

function upload() {
  const [formData, setFormData] = useState({
    videoName: '',
    videoType:'',
    contactNo: '',
    hostName: '',
    // videoUrl: null,
  });

  const handleChange = (e) => {
    const { name, value, file } = e.target;
    setFormData({
      ...formData,
      [name]: file ? file[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('videoName', formData.videoName);
    data.append('contactNo', formData.contactNo);
    data.append('hostName', formData.hostName);
    // data.append('video', formData.video);

    try {
      const response = await axios.post(`${API_END_POINT}/upload`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error uploading the video:', error);
    }
  }; 

  return (
    <div className="max-w-md mx-auto mt-10">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="videoName"
            value={formData.videoName}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Contact No</label>
          <input
            type="text"
            name="contactNo"
            value={formData.contactNo}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Hostname</label>
          <input
            type="text"
            name="hostName"
            value={formData.hostName}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Video</label>
          <input
            type="file"
            name="video"
            onChange={handleChange}
            className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default upload;
