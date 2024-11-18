import React, { useState } from "react";
import axios from "axios";

const Profile = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file!");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:8080/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setPreviewUrl(response.data.fileUrl); // Set the Cloudinary URL
    } catch (error) {
      console.error("Error uploading file:", error.response?.data || error.message);
    }
  };
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = previewUrl;
    link.download = "image.jpg"; // Provide a default filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <h2>File Upload</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {previewUrl && (
        <div>
          <h3>Uploaded Image:</h3>
          <img src={previewUrl} alt="Uploaded" style={{ maxWidth: "100%" }} />
          {previewUrl}
          <div>
          <button className=' bg-red-600'onClick={handleDownload} disabled={!previewUrl}>
        Download Image
      </button>
      </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
