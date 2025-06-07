import { useState } from "react";

const WasteTypePopup = ({
  darkMode,
  onConfirm,
  onClose,
  initialSelected = [],
}) => {
  const [selectedWasteTypes, setSelectedWasteTypes] = useState(initialSelected);

  const wasteTypes = [
    "Soil",
    "Concrete",
    "Bricks",
    "Tiles",
    "Sand",
    "Gravel",
    "Rubble",
  ];

  const toggleWasteType = (wasteType) => {
    setSelectedWasteTypes((prev) =>
      prev.includes(wasteType)
        ? prev.filter((type) => type !== wasteType)
        : [...prev, wasteType]
    );
  };

  const handleConfirm = () => {
    onConfirm(selectedWasteTypes);
  };

  const handleNone = () => {
    onConfirm([]);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      {/* Popup Content */}
      <div
        className={`rounded-lg p-6 w-full max-w-md mx-auto transition-all duration-300 ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
        }`}
      >
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            Do You Have Any Heavy Waste Types?
          </h2>
          <p
            className={`text-sm ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Select All That Apply
          </p>
        </div>

        {/* Waste Type Buttons */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {wasteTypes.map((wasteType) => (
            <button
              key={wasteType}
              onClick={() => toggleWasteType(wasteType)}
              className={`py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                selectedWasteTypes.includes(wasteType)
                  ? darkMode
                    ? "bg-blue-600 text-white"
                    : "bg-blue-500 text-white"
                  : darkMode
                  ? "bg-blue-900 text-blue-200 hover:bg-blue-800"
                  : "bg-blue-100 text-blue-800 hover:bg-blue-200"
              }`}
            >
              {wasteType}
            </button>
          ))}
        </div>

        {/* I Don't Have Any Button */}
        <button
          onClick={handleNone}
          className={`w-full py-3 rounded-lg font-medium mb-4 transition-all duration-300 ${
            darkMode
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-green-500 hover:bg-green-600 text-white"
          }`}
        >
          I Don't Have Any
        </button>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className={`flex-1 py-2 rounded-lg font-medium transition-all duration-300 ${
              darkMode
                ? "bg-gray-600 hover:bg-gray-700 text-white"
                : "bg-gray-300 hover:bg-gray-400 text-gray-800"
            }`}
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={selectedWasteTypes.length === 0}
            className={`flex-1 py-2 rounded-lg font-medium transition-all duration-300 ${
              selectedWasteTypes.length === 0
                ? darkMode
                  ? "bg-blue-900 text-blue-300 cursor-not-allowed"
                  : "bg-blue-100 text-blue-400 cursor-not-allowed"
                : darkMode
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            Confirm
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 text-xl font-bold transition-colors duration-300 ${
            darkMode
              ? "text-gray-400 hover:text-white"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default WasteTypePopup;
