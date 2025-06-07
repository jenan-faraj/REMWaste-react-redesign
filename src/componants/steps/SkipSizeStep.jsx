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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSkipSizes = async () => {
      try {
        setIsLoading(true);
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
      } finally {
        setIsLoading(false);
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
    <div className={`min-h-screen p-6 `}>
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <h2
            className={`text-3xl font-bold mb-2 ${
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

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p
              className={`mt-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              Loading skip sizes...
            </p>
          </div>
        ) : skipSizes.length === 0 ? (
          <div
            className={`text-center py-12 rounded-xl ${
              darkMode ? "bg-gray-800" : "bg-white"
            } p-6 shadow-md`}
          >
            <p
              className={`text-lg ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              No skip sizes available for your location.
            </p>
            <button
              onClick={prevStep}
              className={`mt-4 px-6 py-2 rounded-lg font-medium ${
                darkMode
                  ? "bg-gray-700 hover:bg-gray-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-800"
              }`}
            >
              Try a different location
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skipSizes.map((skip) => {
                const skipImage = skipImages.find(
                  (img) => img.size === String(skip.size)
                )?.image;

                return (
                  <div
                    key={skip.id}
                    className={`relative overflow-hidden rounded-xl transition-all duration-300 cursor-pointer transform hover:scale-[1.02] ${
                      selectedSkip?.id === skip.id
                        ? "ring-3 ring-blue-500 shadow-lg"
                        : "hover:shadow-md"
                    } ${darkMode ? "bg-gray-800" : "bg-white"}`}
                    onClick={() => handleSkipSelect(skip)}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={
                          skipImage ||
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
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-bold shadow-lg ${
                            darkMode
                              ? "bg-blue-700 text-white"
                              : "bg-blue-600 text-white"
                          }`}
                        >
                          {skip.size} Yard{skip.size !== "1" ? "s" : ""}
                        </span>
                      </div>

                      {!skip.allowed_on_road && (
                        <div className="absolute bottom-4 left-4 z-10">
                          <div
                            className={`flex items-center px-2 py-1 rounded-lg text-xs font-semibold ${
                              darkMode
                                ? "bg-black/70 text-yellow-400"
                                : "bg-white/90 text-yellow-700"
                            }`}
                          >
                            <span className="mr-1">⚠️</span>
                            Not Allowed On Road
                          </div>
                        </div>
                      )}
                    </div>

                    <div
                      className={`p-5 ${darkMode ? "bg-gray-800" : "bg-white"}`}
                    >
                      <div className="mb-4">
                        <h3
                          className={`text-xl font-bold mb-1 ${
                            darkMode ? "text-white" : "text-gray-800"
                          }`}
                        >
                          {skip.size} Yard Skip
                        </h3>
                        <p
                          className={`text-sm ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {skip.hire_period_days} day hire period
                        </p>
                      </div>

                      <div className="mb-5">
                        <div className="flex items-baseline">
                          <span
                            className={`text-2xl font-bold ${
                              darkMode ? "text-blue-400" : "text-blue-600"
                            }`}
                          >
                            £{skip.price_before_vat}
                          </span>
                          <span
                            className={`ml-1 text-sm ${
                              darkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            +VAT
                          </span>
                        </div>
                      </div>

                      <button
                        className={`w-full py-2 px-4 rounded-lg font-semibold transition-all duration-200 ${
                          selectedSkip?.id === skip.id
                            ? darkMode
                              ? "bg-blue-700 text-white"
                              : "bg-blue-600 text-white"
                            : darkMode
                            ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
                        }`}
                      >
                        {selectedSkip?.id === skip.id
                          ? "✓ Selected"
                          : "Select This Skip"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div
              className={`pt-6 border-t ${
                darkMode ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <div className="flex justify-between max-w-md mx-auto">
                <button
                  onClick={prevStep}
                  className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
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
                  className={`px-6 py-2 rounded-lg font-medium text-white transition-all duration-200 ${
                    selectedSkip
                      ? darkMode
                        ? "bg-blue-700 hover:bg-blue-600"
                        : "bg-blue-600 hover:bg-blue-700"
                      : "bg-gray-500 cursor-not-allowed opacity-70"
                  }`}
                >
                  Continue
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
