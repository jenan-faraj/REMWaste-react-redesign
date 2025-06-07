import React, { useState } from "react";

const PlasterboardPopup = ({ onClose, darkMode, nextStep }) => {
  const [selectedPercentage, setSelectedPercentage] = useState("");

  const handlePercentageSelect = (percentage) => {
    setSelectedPercentage(percentage);
  };

  const handleSubmit = () => {
    onClose(selectedPercentage);
    nextStep();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className={`rounded-lg p-6 w-full max-w-md mx-auto ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
        }`}
      >
        <button
          onClick={() => onClose("")}
          className={`absolute top-4 right-4 text-xl font-bold ${
            darkMode
              ? "text-gray-400 hover:text-white"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          ×
        </button>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            What percentage of plasterboard would fill your skip?
          </h2>

          <div className="space-y-2 mb-4">
            <div
              className={`p-3 rounded-lg ${
                darkMode ? "bg-gray-700" : "bg-gray-100"
              }`}
            >
              <p className="text-sm">
                Plasterboard has to be disposed of separately and cannot be
                mixed with other waste. Failing to do this could result in
                additional charges.
              </p>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <button
              onClick={() => handlePercentageSelect("Under 5%")}
              className={`w-full text-left p-4 rounded-lg font-medium ${
                selectedPercentage === "Under 5%"
                  ? darkMode
                    ? "bg-blue-600 text-white"
                    : "bg-blue-500 text-white"
                  : darkMode
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              Under 5%
              <p className="text-sm mt-1 opacity-80">
                No Tonne Bag Required. For small amounts of plasterboard (under
                5%). You need to have your own bag to separate plasterboard from
                other waste in the skip.
              </p>
            </button>

            <button
              onClick={() => handlePercentageSelect("5-10%")}
              className={`w-full text-left p-4 rounded-lg font-medium ${
                selectedPercentage === "5-10%"
                  ? darkMode
                    ? "bg-blue-600 text-white"
                    : "bg-blue-500 text-white"
                  : darkMode
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              5-10%
            </button>

            <button
              onClick={() => handlePercentageSelect("Over 10%")}
              className={`w-full text-left p-4 rounded-lg font-medium ${
                selectedPercentage === "Over 10%"
                  ? darkMode
                    ? "bg-blue-600 text-white"
                    : "bg-blue-500 text-white"
                  : darkMode
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              Over 10%
            </button>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!selectedPercentage}
          className={`w-full py-3 px-6 rounded-lg font-medium ${
            selectedPercentage
              ? darkMode
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-blue-500 text-white hover:bg-blue-600"
              : darkMode
              ? "bg-gray-700 text-gray-500 cursor-not-allowed"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default PlasterboardPopup;
