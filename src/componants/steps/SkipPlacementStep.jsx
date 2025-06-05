import { useState, useEffect } from "react";
import SkipPlacementPhotoPopup from "../SkipPlacementPhotoPopup";

export function SkipPlacementStep({ nextStep, prevStep, darkMode, formData }) {
  const [placementType, setPlacementType] = useState(null);
  const [skipData, setSkipData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPhotoPopup, setShowPhotoPopup] = useState(false);

  useEffect(() => {
    const storedSkip = localStorage.getItem("selectedSkip");
    if (storedSkip) {
      try {
        const parsedData = JSON.parse(storedSkip);
        setSkipData(parsedData);
      } catch (error) {
        console.error("Error parsing skip data:", error);
      }
    }
    setLoading(false);
  }, []);

  const handlePlacementSelect = (type) => {
    if (type === "public" && skipData && !skipData.allowed_on_road) {
      return;
    }
    setPlacementType(type);
    localStorage.setItem("selectedPlacementType", type);
  };

  const handleContinue = () => {
    if (placementType) {
      setShowPhotoPopup(true);
    }
  };

  const handlePhotoUpload = (photoUrl) => {
    nextStep({ skipPlacement: placementType, placementPhoto: photoUrl });
  };

  const handleSkipPhoto = () => {
    setShowPhotoPopup(false);
    nextStep({ skipPlacement: placementType });
  };

  if (loading) {
    return (
      <div
        className={`text-center p-8 ${
          darkMode ? "text-white" : "text-gray-800"
        }`}
      >
        Loading skip data...
      </div>
    );
  }

  if (skipData && !skipData.allowed_on_road && !placementType) {
    return (
      <div className="space-y-6">
        <div>
          <h1
            className={`text-2xl font-bold mb-2 ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Road Placement Not Available
          </h1>
          <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            The skip size that you've chosen cannot be placed on public roads
            due to road safety regulations. Please ensure you have adequate
            private space or choose a different skip size.
          </p>
        </div>

        <div className="flex justify-between pt-4">
          <button
            onClick={prevStep}
            className={`px-6 py-3 rounded-xl font-medium transition-colors ${
              darkMode
                ? "bg-gray-700 hover:bg-gray-600 text-white"
                : "bg-gray-200 hover:bg-gray-300 text-gray-800"
            }`}
          >
            Back
          </button>
          <button
            onClick={prevStep}
            className={`px-6 py-3 rounded-xl font-medium text-white transition-colors ${
              darkMode
                ? "bg-blue-600 hover:bg-blue-500"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            Choose Different Skip
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {showPhotoPopup && (
        <SkipPlacementPhotoPopup
          onClose={handleSkipPhoto}
          onPhotoUpload={handlePhotoUpload}
          darkMode={darkMode}
        />
      )}

      <div>
        <h1
          className={`text-2xl font-bold mb-2 ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Where will the skip be placed?
        </h1>
        <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
          This helps us determine if you need a permit for your skip.
        </p>
      </div>

      <div className="space-y-4">
        <div
          onClick={() => handlePlacementSelect("private")}
          className={`p-4 border rounded-xl cursor-pointer transition-all duration-200 ${
            placementType === "private"
              ? darkMode
                ? "border-green-400 bg-green-900/20"
                : "border-green-400 bg-green-100"
              : darkMode
              ? "border-gray-600 hover:border-gray-500 hover:bg-gray-700/50"
              : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
          }`}
        >
          <div className="flex items-start space-x-3">
            <div
              className={`flex-shrink-0 w-5 h-5 mt-0.5 rounded-full border flex items-center justify-center ${
                placementType === "private"
                  ? darkMode
                    ? "border-green-400 bg-green-400"
                    : "border-green-500 bg-green-500"
                  : darkMode
                  ? "border-gray-400"
                  : "border-gray-300"
              }`}
            >
              {placementType === "private" && (
                <div className="w-2 h-2 rounded-full bg-white"></div>
              )}
            </div>
            <div>
              <h3
                className={`font-semibold ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Private Property
              </h3>
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Driveway or private land
              </p>
              <p
                className={`text-sm mt-2 ${
                  darkMode ? "text-green-300" : "text-green-600"
                }`}
              >
                No permit required when placed on your private property
              </p>
            </div>
          </div>
        </div>

        {skipData?.allowed_on_road && (
          <div
            onClick={() => handlePlacementSelect("public")}
            className={`p-4 border rounded-xl cursor-pointer transition-all duration-200 ${
              placementType === "public"
                ? darkMode
                  ? "border-blue-400 bg-blue-900/20"
                  : "border-blue-400 bg-blue-100"
                : darkMode
                ? "border-gray-600 hover:border-gray-500 hover:bg-gray-700/50"
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-start space-x-3">
              <div
                className={`flex-shrink-0 w-5 h-5 mt-0.5 rounded-full border flex items-center justify-center ${
                  placementType === "public"
                    ? darkMode
                      ? "border-blue-400 bg-blue-400"
                      : "border-blue-500 bg-blue-500"
                    : darkMode
                    ? "border-gray-400"
                    : "border-gray-300"
                }`}
              >
                {placementType === "public" && (
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                )}
              </div>
              <div>
                <h3
                  className={`font-semibold ${
                    darkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  Public Road
                </h3>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Council or public property
                </p>
                <p
                  className={`text-sm mt-2 ${
                    darkMode ? "text-yellow-300" : "text-yellow-600"
                  }`}
                >
                  Permit required for placement on public roads
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {placementType === "public" && (
        <div
          className={`p-4 rounded-xl border ${
            darkMode
              ? "bg-gray-800/50 border-gray-600"
              : "bg-gray-100 border-gray-200"
          }`}
        >
          <h3
            className={`font-semibold mb-2 ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Permit Required
          </h3>
          <p
            className={`text-sm ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            A permit is required when placing a skip on a public road. We'll
            handle the permit application process for you.
          </p>

          <h3
            className={`font-semibold mt-4 mb-2 ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Processing Time
          </h3>
          <p
            className={`text-sm ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            The council requires 5 working days notice to process permit
            applications. Please plan your delivery date accordingly.
          </p>
        </div>
      )}

      <div className="flex justify-between pt-4">
        <button
          onClick={prevStep}
          className={`px-6 py-3 rounded-xl font-medium transition-colors ${
            darkMode
              ? "bg-gray-700 hover:bg-gray-600 text-white"
              : "bg-gray-200 hover:bg-gray-300 text-gray-800"
          }`}
        >
          Back
        </button>
        <button
          onClick={handleContinue}
          disabled={!placementType}
          className={`px-6 py-3 rounded-xl font-medium text-white transition-colors ${
            placementType
              ? darkMode
                ? "bg-blue-600 hover:bg-blue-500"
                : "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-500 cursor-not-allowed"
          }`}
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
