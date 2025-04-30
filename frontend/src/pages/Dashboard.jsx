// pages/Dashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import UploadForm from "../components/UploadForm";

const Dashboard = () => {
  const [files, setFiles] = useState([]);

  const fetchFiles = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/files/user/${localStorage.getItem("userId")}`);
      setFiles(res.data.files);
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Uploaded Files</h1>
      <UploadForm onUploadSuccess={fetchFiles} />
      <div className="space-y-2">
        {files.length > 0 ? (
          files.map((file) => (
            <div key={file._id} className="p-3 bg-gray-100 rounded shadow">
              <p><strong>Name:</strong> {file.originalName}</p>
              <a href={`http://localhost:3000/${file.filePath}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Open File</a>
            </div>
          ))
        ) : (
          <p>No files uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
