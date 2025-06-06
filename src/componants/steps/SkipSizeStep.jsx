import { useEffect, useState } from "react";
import axios from "axios";

const skipImages = [
  {
    size: "4",
    image:
      "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/4-yarder-skip.jpg",
  },
  {
    size: "6",
    image:
      "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/5-yarder-skip.jpg",
  },
  {
    size: "8",
    image:
      "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/6-yarder-skip.jpg",
  },
  {
    size: "10",
    image:
      "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/8-yarder-skip.jpg",
  },
  {
    size: "12",
    image:
      "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/10-yarder-skip.jpg",
  },
  {
    size: "14",
    image:
      "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/12-yarder-skip.jpg",
  },
  {
    size: "16",
    image:
      "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/14-yarder-skip.jpg",
  },
  {
    size: "20",
    image:
      "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/20-yarder-skip.jpg",
  },
  {
    size: "40",
    image:
      "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/40-yarder-skip.jpg",
  },
];

export default function SkipSizeStep({
  nextStep = () => {},
  prevStep = () => {},
  darkMode = false,
  formData = { postcode: "NR32", area: "Lowestoft" },
}) {
  const [selectedSkip, setSelectedSkip] = useState(null);
  const [skipSizes, setSkipSizes] = useState([]);

  useEffect(() => {
    const fetchSkipSizes = async () => {
      try {
        const response = await axios.get(
          "https://app.wewantwaste.co.uk/api/skips/by-location",
          {
            params: {
              postcode: formData?.postcode || "NR32",
              area: formData?.area || "Lowestoft",
            },
          }
        );
        setSkipSizes(response.data);
      } catch (error) {
        console.error("Error fetching skip sizes:", error);
      }
    };

    fetchSkipSizes();
  }, [formData]);

  const handleSkipSelect = (skip) => {
    setSelectedSkip(skip);
  };

  const handleContinue = () => {
    if (selectedSkip) {
      const selectedSkipData = JSON.stringify(selectedSkip);
      localStorage.setItem("selectedSkip", selectedSkipData);
      nextStep({ skipSize: selectedSkip });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center">
          <h2
            className={`text-3xl font-bold mb-4 ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Choose Your Skip Size
          </h2>
          <p
            className={`text-lg ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Select the skip size that best suits your needs
          </p>
        </div>

        {skipSizes.length === 0 && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p
              className={`mt-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              Loading skip sizes...
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skipSizes.map((skip) => (
            <div
              key={skip.id}
              className={`relative overflow-hidden rounded-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                selectedSkip?.id === skip.id
                  ? "ring-4 ring-blue-500 shadow-2xl scale-105"
                  : "hover:shadow-xl"
              } bg-gray-900 shadow-lg`}
              onClick={() => handleSkipSelect(skip)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={
                    skipImages.find((img) => img.size === String(skip.size))
                      ?.image ??
                    "https://via.placeholder.com/400x300/3B82F6/ffffff?text=Skip+Image"
                  }
                  alt={`${skip.size} Yard Skip`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/400x300/3B82F6/ffffff?text=Skip+Image";
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                <div className="absolute top-4 right-4 z-10">
                  <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    {skip.size} Yards
                  </span>
                </div>

                {!skip.allowed_on_road && (
                  <div className="absolute bottom-4 left-4 z-10">
                    <div className="flex items-center bg-black/70 text-yellow-400 px-3 py-2 rounded-lg text-xs font-semibold">
                      <span className="mr-2">⚠️</span>
                      Not Allowed On The Road
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6 bg-gray-900">
                <div className="mb-4">
                  <h3 className="text-xl font-bold mb-2 text-white">
                    {skip.size} Yard Skip
                  </h3>
                  <p className="text-sm text-gray-400">
                    {skip.hire_period_days} day hire period
                  </p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-blue-400">
                      £{skip.price_before_vat}
                    </span>
                  </div>
                </div>

                <button
                  className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
                    selectedSkip?.id === skip.id
                      ? "bg-blue-600 text-white shadow-lg transform scale-105"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600"
                  }`}
                >
                  {selectedSkip?.id === skip.id
                    ? "✓ Selected"
                    : "Select This Skip →"}
                </button>
              </div>

              {selectedSkip?.id === skip.id && (
                <div className="absolute inset-0 bg-blue-500/10 pointer-events-none border-4 border-blue-500 rounded-2xl"></div>
              )}
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between max-w-md mx-auto">
            <button
              onClick={prevStep}
              className={`px-8 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 ${
                darkMode
                  ? "bg-gray-700 hover:bg-gray-600 text-white shadow-lg"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-800 shadow-md"
              }`}
            >
              ← Back
            </button>
            <button
              onClick={handleContinue}
              disabled={!selectedSkip}
              className={`px-8 py-3 rounded-xl font-medium text-white transition-all duration-200 transform hover:scale-105 ${
                selectedSkip
                  ? darkMode
                    ? "bg-blue-600 hover:bg-blue-500 shadow-lg"
                    : "bg-blue-500 hover:bg-blue-600 shadow-md"
                  : "bg-gray-500 cursor-not-allowed opacity-50"
              }`}
            >
              Continue →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
