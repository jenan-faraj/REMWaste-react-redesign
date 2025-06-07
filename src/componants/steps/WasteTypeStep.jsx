import { useState, useEffect } from "react";
import WasteTypePopup from "../WasteTypePopup";
import HeavyWastePopup from "../HeavyWastePopup";
import YesPopup from "../YesPopup";

export default function WasteTypeStep({ nextStep, prevStep, darkMode }) {
  const [selectedWasteTypes, setSelectedWasteTypes] = useState([]);
  const [showWasteTypePopup, setShowWasteTypePopup] = useState(false);
  const [showHeavyWastePopup, setShowHeavyWastePopup] = useState(false);
  const [showYesPopup, setShowYesPopup] = useState(false);
  const [heavyWasteTypes, setHeavyWasteTypes] = useState([]);
  const [heavyWastePercentage, setHeavyWastePercentage] = useState("");

  useEffect(() => {
    const savedWasteTypes = localStorage.getItem("selectedWasteTypes");
    if (savedWasteTypes) {
      setSelectedWasteTypes(JSON.parse(savedWasteTypes));
    }

    const savedHeavyWasteTypes = localStorage.getItem("heavyWasteTypes");
    if (savedHeavyWasteTypes) {
      setHeavyWasteTypes(JSON.parse(savedHeavyWasteTypes));
    }

    const savedPercentage = localStorage.getItem("heavyWastePercentage");
    if (savedPercentage) {
      setHeavyWastePercentage(savedPercentage);
    }
  }, []);

  const toggleWasteType = (type) => {
    let newSelectedTypes;
    if (selectedWasteTypes.includes(type)) {
      newSelectedTypes = selectedWasteTypes.filter((t) => t !== type);
    } else {
      newSelectedTypes = [...selectedWasteTypes, type];
    }
    setSelectedWasteTypes(newSelectedTypes);
    localStorage.setItem(
      "selectedWasteTypes",
      JSON.stringify(newSelectedTypes)
    );

    if (
      (type === "Construction Waste" && !selectedWasteTypes.includes(type)) ||
      (type === "Garden Waste" && !selectedWasteTypes.includes(type))
    ) {
      setShowWasteTypePopup(true);
    }
  };

  const handleHeavyWasteTypesConfirm = (types) => {
    setHeavyWasteTypes(types);
    localStorage.setItem("heavyWasteTypes", JSON.stringify(types));
    setShowWasteTypePopup(false);

    if (types.length === 0) {
      setShowYesPopup(true);
    } else {
      setTimeout(() => {
        setShowHeavyWastePopup(true);
      }, 300);
    }
  };

  const handleHeavyWastePercentageSelect = (percentage) => {
    setHeavyWastePercentage(percentage);
    localStorage.setItem("heavyWastePercentage", percentage);
    setShowHeavyWastePopup(false);

    setTimeout(() => {
      setShowYesPopup(true);
    }, 300);
  };

  const isSelected = (type) => selectedWasteTypes.includes(type);

  return (
    <div className="w-full max-w-sm sm:max-w-md lg:max-w-5xl mx-auto p-4 sm:p-6 flex flex-col min-h-[85vh] sm:min-h-[90vh]">
      <div className="flex-grow">
        <div className="mb-6 lg:mb-8">
          <h2
            className={`text-lg sm:text-xl lg:text-2xl font-semibold ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Waste Type
          </h2>
          <p
            className={`text-xs sm:text-sm lg:text-base ${
              darkMode ? "text-gray-300" : "text-gray-500"
            }`}
          >
            Select all that apply
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
          {[
            {
              id: "Construction Waste",
              description: "Building materials and renovation debris.",
            },
            {
              id: "Garden Waste",
              description: "Green waste and landscaping materials",
            },
            {
              id: "Household Waste",
              description: "General household items and furniture.",
            },
            {
              id: "Commercial Waste",
              description: "Business and office clearance",
            },
          ].map((waste) => (
            <div
              key={waste.id}
              className={`p-3 sm:p-4 lg:p-6 rounded-lg border cursor-pointer transition-all hover:scale-105 ${
                isSelected(waste.id)
                  ? darkMode
                    ? "bg-blue-600/20 border-blue-500 shadow-lg"
                    : "bg-blue-100 border-blue-300 shadow-lg"
                  : darkMode
                  ? "bg-gray-700/50 border-gray-600 hover:bg-gray-700/70"
                  : "bg-white border-gray-200 hover:bg-gray-50"
              }`}
              onClick={() => toggleWasteType(waste.id)}
            >
              <h3
                className={`font-semibold text-sm sm:text-base lg:text-lg ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                {waste.id}
              </h3>
              <p
                className={`text-xs sm:text-sm lg:text-base mt-1 sm:mt-2 ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {waste.description}
              </p>

              {waste.id === "Construction Waste" &&
                isSelected(waste.id) &&
                heavyWasteTypes.length > 0 && (
                  <div className="mt-2">
                    <p
                      className={`text-xs ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Selected heavy waste:
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {heavyWasteTypes.map((type) => (
                        <span
                          key={type}
                          className={`px-2 py-1 rounded-full text-xs ${
                            darkMode
                              ? "bg-blue-900 text-blue-200"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 sm:mt-8">
        <div className="flex justify-between gap-3 sm:gap-4">
          <button
            onClick={prevStep}
            className={`flex-1 sm:flex-none px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 rounded-lg font-medium text-sm sm:text-base lg:text-lg transition-all hover:scale-105 ${
              darkMode
                ? "bg-gray-700 hover:bg-gray-600 text-white"
                : "bg-gray-200 hover:bg-gray-300 text-gray-800"
            }`}
          >
            Back
          </button>
          <button
            onClick={() =>
              nextStep({
                wasteTypes: selectedWasteTypes,
                heavyWasteTypes: heavyWasteTypes,
                heavyWastePercentage: heavyWastePercentage,
              })
            }
            disabled={selectedWasteTypes.length === 0}
            className={`flex-1 sm:flex-none px-4 cursor-pointer sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 rounded-lg font-medium text-sm sm:text-base lg:text-lg text-white transition-all hover:scale-105 disabled:hover:scale-100 ${
              darkMode
                ? "bg-blue-600 hover:bg-blue-500 disabled:bg-gray-500 disabled:cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 disabled:bg-gray-500 disabled:cursor-not-allowed"
            }`}
          >
            Continue
          </button>
        </div>
      </div>

      {showWasteTypePopup && (
        <WasteTypePopup
          darkMode={darkMode}
          onConfirm={handleHeavyWasteTypesConfirm}
          onClose={() => setShowWasteTypePopup(false)}
          initialSelected={heavyWasteTypes}
        />
      )}

      {showHeavyWastePopup && (
        <HeavyWastePopup
          isOpen={showHeavyWastePopup}
          onClose={() => setShowHeavyWastePopup(false)}
          onSelect={handleHeavyWastePercentageSelect}
          darkMode={darkMode}
        />
      )}

      {showYesPopup && (
        <YesPopup
          onClose={() => setShowYesPopup(false)}
          nextStep={nextStep}
          darkMode={darkMode}
        />
      )}
    </div>
  );
}
