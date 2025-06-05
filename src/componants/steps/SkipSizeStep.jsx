import axios from "axios";
import { useEffect, useState } from "react";

export function SkipSizeStep({ nextStep, prevStep, darkMode, formData }) {
  const [selectedSkip, setSelectedSkip] = useState(null);
  const [skipSizes, setSkipSizes] = useState([]);

  useEffect(() => {
    const fetchSkipSizes = async () => {
      try {
        const response = await axios.get(
          "https://app.wewantwaste.co.uk/api/skips/by-location",
          {
            params: {
              postcode: "NR32",
              area: "Lowestoft",
            },
          }
        );
        setSkipSizes(response.data);
      } catch (error) {
        console.error("Error fetching skip sizes:", error);
      }
    };

    fetchSkipSizes();
  }, []);

  const handleSkipSelect = (skip) => {
    setSelectedSkip(skip);
  };

  const handleContinue = () => {
    if (selectedSkip) {
      localStorage.setItem("selectedSkipId", selectedSkip.id);
      nextStep({ skipSize: selectedSkip });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2
          className={`text-2xl font-bold mb-2 ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Choose Your Skip Size
        </h2>
        <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
          Select the skip size that best suits your needs
        </p>
      </div>

      <div className="space-y-4">
        {skipSizes.map((skip) => (
          <div
            key={skip.id}
            onClick={() => handleSkipSelect(skip)}
            className={`p-4 border rounded-xl cursor-pointer transition-all duration-200 ${
              selectedSkip?.id === skip.id
                ? darkMode
                  ? "border-blue-400 bg-blue-900/20"
                  : "border-blue-400 bg-blue-100"
                : darkMode
                ? "border-gray-600 hover:border-gray-500 hover:bg-gray-700/50"
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3
                  className={`font-semibold ${
                    darkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  {skip.size} Yard Skip
                </h3>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {skip.hire_period_days} day hire period
                </p>
              </div>
              <div className="text-right">
                <p
                  className={`font-bold ${
                    darkMode ? "text-blue-300" : "text-blue-600"
                  }`}
                >
                  £{(skip.price_before_vat * (1 + skip.vat / 100)).toFixed(2)}
                </p>
                <p
                  className={`text-xs ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  inc. VAT
                </p>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-dashed border-gray-400/30">
              <button
                className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                  selectedSkip?.id === skip.id
                    ? darkMode
                      ? "bg-blue-600 text-white"
                      : "bg-blue-500 text-white"
                    : darkMode
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {selectedSkip?.id === skip.id
                  ? "Selected"
                  : "Select This Skip →"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <p
          className={`text-xs text-center mb-4 ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Images and information shown throughout this website may not reflect
          the exact shape or size specification, colours may vary, options
          and/or accessories may be featured at additional cost.
        </p>

        <div className="flex justify-between">
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
            disabled={!selectedSkip}
            className={`px-6 py-3 rounded-xl font-medium text-white transition-colors ${
              selectedSkip
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
    </div>
  );
}
