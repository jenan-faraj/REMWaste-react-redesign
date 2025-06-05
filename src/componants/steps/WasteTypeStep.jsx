import { useState, useEffect } from "react";

export function WasteTypeStep({ nextStep, prevStep, darkMode }) {
  const [selectedWasteTypes, setSelectedWasteTypes] = useState([]);

  useEffect(() => {
    const savedWasteTypes = localStorage.getItem("selectedWasteTypes");
    if (savedWasteTypes) {
      setSelectedWasteTypes(JSON.parse(savedWasteTypes));
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
  };

  const isSelected = (type) => selectedWasteTypes.includes(type);

  return (
    <div className="max-w-md mx-auto p-6 flex flex-col min-h-[90vh]">
      <div className="flex-grow">
        <div className="mb-6">
          <h2
            className={`text-xl font-semibold ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Waste Type
          </h2>
          <p
            className={`text-sm ${
              darkMode ? "text-gray-300" : "text-gray-500"
            }`}
          >
            Select all that apply
          </p>
        </div>

        <div className="space-y-4">
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
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                isSelected(waste.id)
                  ? darkMode
                    ? "bg-blue-600/20 border-blue-500"
                    : "bg-blue-100 border-blue-300"
                  : darkMode
                  ? "bg-gray-700/50 border-gray-600"
                  : "bg-white border-gray-200"
              }`}
              onClick={() => toggleWasteType(waste.id)}
            >
              <h3
                className={`font-semibold ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                {waste.id}
              </h3>
              <p
                className={`text-sm mt-1 ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {waste.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <div className="flex justify-between">
          <button
            onClick={prevStep}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              darkMode
                ? "bg-gray-700 hover:bg-gray-600 text-white"
                : "bg-gray-200 hover:bg-gray-300 text-gray-800"
            }`}
          >
            Back
          </button>
          <button
            onClick={() => nextStep({ wasteTypes: selectedWasteTypes })}
            disabled={selectedWasteTypes.length === 0}
            className={`px-6 py-3 rounded-lg font-medium text-white transition-colors ${
              darkMode
                ? "bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50"
                : "bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400"
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
