import { useState } from "react";
import axios from "axios";

const UploadForm = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file!");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", localStorage.getItem("userId"));

    try {
      const res = await axios.post("http://localhost:3000/api/files/upload", formData);
      console.log(res.data);
      alert("File uploaded successfully!");
      onUploadSuccess(); // Refresh file list in Dashboard
    } catch (err) {
      console.error(err);
      alert("File upload failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-4 my-4">
      <input type="file" onChange={handleFileChange} />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Upload</button>
    </form>
  );
};

export default UploadForm;
