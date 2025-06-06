import { useState } from "react";

export default function SkipPlacementPhotoPopup({
  onClose,
  onPhotoUpload,
  darkMode,
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      localStorage.setItem("skipPlacementPhoto", previewUrl);
      onPhotoUpload(previewUrl);
      onClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 h-screen bg-black/30 bg-opacity-50 flex items-center justify-center p-4 z-50 ${
        darkMode ? "dark" : ""
      }`}
    >
      <div
        className={`w-full max-w-md rounded-xl p-6 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h2
          className={`text-xl font-bold mb-4 ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Skip Placement Photo
        </h2>
        <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
          Please provide a photo of where you plan to place the skip. This helps
          us ensure proper placement and identify any potential access issues.
        </p>

        <div className="mb-4">
          {previewUrl ? (
            <div className="relative">
              <img
                src={previewUrl}
                alt="Skip placement preview"
                className="w-full h-48 object-cover rounded-lg border border-gray-300"
              />
              <button
                onClick={() => {
                  setSelectedFile(null);
                  setPreviewUrl(null);
                }}
                className={`absolute top-2 right-2 p-1 rounded-full ${
                  darkMode ? "bg-gray-700" : "bg-gray-200"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <label
              htmlFor="skip-photo-upload"
              className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer ${
                darkMode
                  ? "border-gray-600 hover:border-gray-500"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-10 h-10 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p
                  className={`mb-2 text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p
                  className={`text-xs ${
                    darkMode ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  PNG, JPG (MAX. 5MB)
                </p>
              </div>
              <input
                id="skip-photo-upload"
                type="file"
                className="hidden"
                accept="image/png, image/jpeg"
                onChange={handleFileChange}
              />
            </label>
          )}
        </div>

        <div className="flex justify-between">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-lg font-medium ${
              darkMode
                ? "bg-gray-700 hover:bg-gray-600 text-white"
                : "bg-gray-200 hover:bg-gray-300 text-gray-800"
            }`}
          >
            Cancel
          </button>
          <div className="flex space-x-2">
            <button
              onClick={handleUpload}
              disabled={!selectedFile}
              className={`px-4 py-2 rounded-lg font-medium text-white ${
                selectedFile
                  ? darkMode
                    ? "bg-blue-600 hover:bg-blue-500"
                    : "bg-blue-500 hover:bg-blue-600"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
