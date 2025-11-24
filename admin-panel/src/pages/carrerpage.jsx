import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";

// Helper for local video/image paths
const getMediaUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("http") || url.startsWith("https")) return url;
  return `http://localhost:5000/${url.replace(/\\/g, "/")}`;
};

function Carrer() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [videoFile, setVideoFile] = useState(null);
  const [uploadedVideo, setUploadedVideo] = useState(null);
  const [applicants, setApplicants] = useState([]);

  const [sectionData, setSectionData] = useState({
    title: "",
    subtitle: "",
    description: "",
  });

  useEffect(() => {
    fetchUploadedImages();
    fetchVideo();
    fetchSectionContent();
  }, []);

  const fetchUploadedImages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/career/images");
      setUploadedImages(res.data.images || []);
    } catch (err) {
      console.error("Error fetching images:", err);
    }
  };

  const fetchVideo = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/career/video");
      setUploadedVideo(res.data.data);
    } catch (err) {
      console.error("Error fetching video:", err);
    }
  };

  const fetchSectionContent = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/career/section");
      if (res.data.data) {
        setSectionData(res.data.data);
      }
      setApplicants(res.data.data?.applicants || []);
    } catch (err) {
      console.error("Error fetching section content:", err);
    }
  };

  const handleFileChange = (e) => {
    const filesArray = Array.from(e.target.files);
    setSelectedFiles(filesArray);
  };

  const handleVideoChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    if (selectedFiles.length === 0) return alert("No images selected!");
    setUploading(true);

    try {
      for (let file of selectedFiles) {
        const formData = new FormData();
        formData.append("image", file);
        await axios.post("http://localhost:5000/api/career/image", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      setSelectedFiles([]);
      fetchUploadedImages();
      alert("Images uploaded successfully!");
    } catch (err) {
      alert("Error uploading images");
    } finally {
      setUploading(false);
    }
  };

  const uploadVideo = async () => {
    if (!videoFile) return alert("Select a video first!");
    const formData = new FormData();
    formData.append("video", videoFile);

    try {
      await axios.post("http://localhost:5000/api/career/video", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setVideoFile(null);
      fetchVideo();
      alert("Video uploaded successfully!");
    } catch {
      alert("Error uploading video!");
    }
  };

  const saveSectionData = async () => {
    try {
      await axios.put("http://localhost:5000/api/career/section", sectionData);
      alert("Saved successfully!");
    } catch {
      alert("Error saving text!");
    }
  };

  const handleRemoveImage = async (public_id) => {
    if (!window.confirm("Delete this image?")) return;
    try {
      const encodedId = encodeURIComponent(public_id);
      await axios.delete(`http://localhost:5000/api/career/image/${encodedId}`);
      fetchUploadedImages();
    } catch (err) {
      alert("Error deleting image");
    }
  };

  const handleDeleteApplicant = async (id) => {
    if (!window.confirm("Are you sure you want to delete this application?"))
      return;
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/career/applicant/${id}`
      );
      if (res.data.success) {
        setApplicants(res.data.applicants);
        alert("Applicant deleted successfully");
      }
    } catch (err) {
      alert("Error deleting applicant");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#0f0f0f]">
      <Sidebar />

      <div className="flex-1 p-4 md:pl-80 md:pt-12 pt-24 text-gray-300 w-full overflow-hidden">
        <h1 className="text-2xl md:text-4xl font-bold mb-6 text-white text-center md:text-left">
          🚀 Careers Management
        </h1>

        {/* 1. TESTIMONIAL & VIDEO SECTION */}
        <div className="bg-white/10 backdrop-blur-md p-4 md:p-6 mb-8 rounded-xl shadow-md border border-white/20">
          <h2 className="text-lg md:text-xl font-semibold mb-4 text-white">
            🎥 Testimonial Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Employee Name
              </label>
              <input
                type="text"
                value={sectionData.title}
                onChange={(e) =>
                  setSectionData({ ...sectionData, title: e.target.value })
                }
                className="w-full p-2 bg-black/30 border border-gray-600 rounded text-white focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Job Role
              </label>
              <input
                type="text"
                value={sectionData.subtitle}
                onChange={(e) =>
                  setSectionData({ ...sectionData, subtitle: e.target.value })
                }
                className="w-full p-2 bg-black/30 border border-gray-600 rounded text-white focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-1">Quote</label>
            <textarea
              rows="2"
              value={sectionData.description}
              onChange={(e) =>
                setSectionData({ ...sectionData, description: e.target.value })
              }
              className="w-full p-2 bg-black/30 border border-gray-600 rounded text-white focus:border-blue-500 outline-none"
            ></textarea>
          </div>

          <button
            className="w-full md:w-auto bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700 text-white font-medium mb-6 transition"
            onClick={saveSectionData}
          >
            💾 Save Details
          </button>

          <hr className="border-gray-700 mb-6" />

          {/* Video Upload */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              className="w-full md:w-auto text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-700 file:text-white hover:file:bg-gray-600"
            />
            <button
              className="w-full md:w-auto bg-purple-600 px-6 py-2 rounded-lg hover:bg-purple-700 text-white transition"
              onClick={uploadVideo}
            >
              ⬆ Upload Video
            </button>
          </div>

          {uploadedVideo && (
            <div className="mt-6">
              <p className="text-sm text-gray-400 mb-2">Video Preview:</p>
              <video
                controls
                className="w-full md:w-1/2 h-48 md:h-64 rounded-lg border border-gray-700 bg-black"
              >
                <source src={getMediaUrl(uploadedVideo.url)} type="video/mp4" />
              </video>
            </div>
          )}
        </div>

        {/* 2. IMAGES SECTION */}
        <div className="bg-white/10 backdrop-blur-md p-4 md:p-6 rounded-xl shadow-md border border-white/20 mb-8">
          <h2 className="text-lg md:text-xl font-semibold mb-4 text-white">
            📸 Team Images
          </h2>

          <form onSubmit={handleImageUpload} className="space-y-4">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer border-gray-600 hover:border-blue-400 bg-black/20 transition">
              <span className="text-gray-400 text-sm">
                Tap to Select Images
              </span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            <button
              type="submit"
              className="w-full md:w-auto bg-green-600 px-6 py-2 rounded-lg text-white hover:bg-green-700 transition"
            >
              {uploading ? "⏳ Uploading..." : "Start Upload"}
            </button>
          </form>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mt-6">
            {uploadedImages.map((img) => (
              <div key={img.public_id} className="relative group aspect-square">
                <img
                  src={getMediaUrl(img.url)}
                  className="w-full h-full rounded-lg object-cover border border-gray-700"
                  alt="Team"
                />
                <button
                  onClick={() => handleRemoveImage(img.public_id)}
                  className="absolute top-1 right-1 bg-red-600 text-white text-xs p-1.5 rounded-full shadow-lg"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 3. APPLICANTS SECTION */}
        <div className="bg-white/10 backdrop-blur-md p-4 md:p-6 rounded-xl shadow-md border border-white/20 mb-20">
          <h2 className="text-xl md:text-2xl font-semibold mb-6 text-white">
            📄 Job Applications ({applicants.length})
          </h2>

          {applicants.length === 0 ? (
            <p className="text-gray-400 text-center py-8 border border-dashed border-gray-700 rounded-lg">
              No applications yet.
            </p>
          ) : (
            <>
              {/* ➤ MOBILE VIEW: Card List (Visible on Small Screens) */}
              <div className="block md:hidden space-y-4">
                {applicants.map((app) => (
                  <div
                    key={app._id}
                    className="bg-black/40 border border-gray-700 rounded-lg p-4 space-y-3"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-white font-bold text-lg">
                          {app.fullName}
                        </h3>
                        <p className="text-sm text-gray-400">{app.email}</p>
                        <p className="text-xs text-gray-500">{app.mobile}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteApplicant(app._id)}
                        className="text-red-400 text-sm border border-red-900 bg-red-900/20 px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>

                    <div className="border-t border-gray-700 pt-2">
                      <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                        Skills
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {app.selectedTechnologies?.map((t, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 bg-blue-900/40 text-blue-200 text-xs rounded border border-blue-800"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                        Address
                      </p>
                      <p className="text-sm text-gray-300">{app.address}</p>
                    </div>

                    <div className="pt-2">
                      {app.resume?.url ? (
                        <a
                          href={getMediaUrl(app.resume.url)}
                          target="_blank"
                          rel="noreferrer"
                          className="block w-full text-center bg-green-900/30 text-green-400 border border-green-800 py-2 rounded text-sm font-medium"
                        >
                          📄 Download Resume
                        </a>
                      ) : (
                        <span className="text-xs text-gray-600 italic">
                          No Resume Uploaded
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* ➤ DESKTOP VIEW: Table (Hidden on Small Screens) */}
              <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-700">
                <table className="w-full text-left text-gray-300 min-w-[800px]">
                  <thead className="bg-black/40 text-xs uppercase text-gray-400">
                    <tr>
                      <th className="px-4 py-3">Name</th>
                      <th className="px-4 py-3">Contact</th>
                      <th className="px-4 py-3">Role Type</th>
                      <th className="px-4 py-3">Skills</th>
                      <th className="px-4 py-3">Address</th>
                      <th className="px-4 py-3">Resume</th>
                      <th className="px-4 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {applicants.map((app) => (
                      <tr
                        key={app._id}
                        className="border-b border-gray-700 hover:bg-white/5 transition"
                      >
                        <td className="px-4 py-3 font-medium text-white">
                          {app.fullName}
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-white">{app.email}</div>
                          <div className="text-xs text-gray-500">
                            {app.mobile}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-1 rounded text-xs font-bold border ${
                              app.jobType === "Internship"
                                ? "bg-purple-900/40 text-purple-300 border-purple-700"
                                : "bg-blue-900/40 text-blue-300 border-blue-700"
                            }`}
                          >
                            {app.jobType || "Full Time"}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1 w-40">
                            {app.selectedTechnologies?.map((t, i) => (
                              <span
                                key={i}
                                className="px-1.5 py-0.5 bg-blue-900/40 text-blue-200 text-[10px] rounded border border-blue-800"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td
                          className="px-4 py-3 max-w-[150px] truncate"
                          title={app.address}
                        >
                          {app.address}
                        </td>
                        <td className="px-4 py-3">
                          {app.resume?.url ? (
                            <a
                              href={getMediaUrl(app.resume.url)}
                              target="_blank"
                              rel="noreferrer"
                              className="text-green-400 hover:underline"
                            >
                              Download
                            </a>
                          ) : (
                            <span className="text-gray-600">No File</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => handleDeleteApplicant(app._id)}
                            className="text-red-400 hover:text-red-300 border border-red-500/50 px-2 py-1 rounded hover:bg-red-500/10 transition"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Carrer;
