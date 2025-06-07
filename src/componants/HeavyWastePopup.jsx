import React, { useState } from "react";

const HeavyWastePopup = ({ isOpen, onClose, onSelect, darkMode }) => {
  const [selectedPercentage, setSelectedPercentage] = useState("");

  const percentageOptions = ["Under 5%", "5-10%", "10-20%", "Over 20%"];

  const handlePercentageSelect = (percentage) => {
    setSelectedPercentage(percentage);
    onSelect(percentage);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className={`rounded-lg p-6 w-full max-w-lg mx-auto transition-all duration-300 ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
        }`}
      >
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">
            How Much Heavy Waste Will You Put In The Skip?
          </h2>

          <div
            className={`p-4 rounded-lg mb-6 border-l-4 ${
              darkMode
                ? "bg-yellow-900/30 border-yellow-500 text-yellow-200"
                : "bg-yellow-50 border-yellow-500 text-yellow-800"
            }`}
          >
            <div className="flex items-start">
              <div className="mr-3 mt-0.5">
                <span className="text-yellow-500">⚠️</span>
              </div>
              <div>
                <h3 className="font-semibold mb-2">
                  Important Notice For Collection
                </h3>
                <p className="text-sm">
                  Our skip trucks have weight restrictions, we cannot lift skips
                  that weigh too much or transport them safely. Tell us how much
                  heavy waste you will be putting in your skip.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {percentageOptions.map((percentage) => (
            <button
              key={percentage}
              onClick={() => handlePercentageSelect(percentage)}
              className={`py-4 px-6 rounded-lg font-medium transition-all duration-300 ${
                selectedPercentage === percentage
                  ? darkMode
                    ? "bg-blue-600 text-white border-2 border-blue-400"
                    : "bg-blue-500 text-white border-2 border-blue-300"
                  : darkMode
                  ? "bg-blue-900 text-blue-200 hover:bg-blue-800 border-2 border-transparent"
                  : "bg-blue-100 text-blue-800 hover:bg-blue-200 border-2 border-transparent"
              }`}
            >
              {percentage}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeavyWastePopup;
