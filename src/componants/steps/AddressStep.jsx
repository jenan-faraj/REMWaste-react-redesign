import { useState } from "react";
import { Search, MapPin, Home, Building, X } from "lucide-react";
import { locations } from "../../constants/locations";

export function AddressStep({ nextStep, darkMode }) {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [addressDetails, setAddressDetails] = useState(() => {
    const savedAddress = localStorage.getItem("skipHireAddress");
    return savedAddress
      ? JSON.parse(savedAddress)
      : {
          houseNumber: "",
          streetName: "",
          city: "",
        };
  });

  const filteredLocations = locations.filter(
    (location) =>
      location.postcode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.area.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setShowSuggestions(e.target.value.length > 0);
    setSelectedLocation(null);
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setSearchTerm(`${location.postcode} - ${location.area}`);
    setShowSuggestions(false);
    setAddressDetails((prev) => ({ ...prev, city: location.area }));
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSelectedLocation(null);
    setShowSuggestions(false);
    setAddressDetails({ houseNumber: "", streetName: "", city: "" });
    localStorage.removeItem("skipHireAddress");
  };

  const handleInputChange = (field, value) => {
    const updatedDetails = { ...addressDetails, [field]: value };
    setAddressDetails(updatedDetails);
    localStorage.setItem("skipHireAddress", JSON.stringify(updatedDetails));
  };

  const handleContinue = () => {
    if (
      selectedLocation &&
      addressDetails.houseNumber &&
      addressDetails.streetName
    ) {
      localStorage.setItem(
        "skipHireAddress",
        JSON.stringify({
          ...addressDetails,
          postcode: selectedLocation.postcode,
          area: selectedLocation.area,
        })
      );
      nextStep({
        address: {
          ...addressDetails,
          postcode: selectedLocation.postcode,
          area: selectedLocation.area,
        },
      });
    }
  };

  const isFormComplete =
    selectedLocation && addressDetails.houseNumber && addressDetails.streetName;

  return (
    <div className="space-y-6">
      {!selectedLocation ? (
        <div className="space-y-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search
                className={`h-5 w-5 transition-colors duration-300 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              />
            </div>
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <X className="h-5 w-5" />
              </button>
            )}
            <input
              type="text"
              placeholder="Start typing postcode or area..."
              value={searchTerm}
              onChange={handleSearchChange}
              className={`w-full pl-12 ${
                searchTerm ? "pr-12" : "pr-4"
              } py-4 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 ${
                darkMode
                  ? "bg-white/20 border-white/30 text-white placeholder-gray-300"
                  : "bg-gray-50/80 border-gray-300 text-gray-800 placeholder-gray-500"
              }`}
            />
          </div>

          {showSuggestions && filteredLocations.length > 0 && (
            <div
              className={`backdrop-blur-lg rounded-2xl shadow-xl border overflow-hidden transition-all duration-300 ${
                darkMode
                  ? "bg-gray-800/95 border-gray-600/30"
                  : "bg-white/95 border-gray-200/50"
              }`}
            >
              {filteredLocations.map((location) => (
                <button
                  key={location.id}
                  onClick={() => handleLocationSelect(location)}
                  className={`w-full px-6 py-4 text-left transition-colors duration-200 border-b last:border-b-0 group ${
                    darkMode
                      ? "hover:bg-gray-700/50 border-gray-600/30"
                      : "hover:bg-blue-50 border-gray-100"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <MapPin
                      className={`w-5 h-5 transition-colors duration-200 ${
                        darkMode
                          ? "text-blue-400 group-hover:text-blue-300"
                          : "text-blue-500 group-hover:text-blue-600"
                      }`}
                    />
                    <div>
                      <div
                        className={`font-semibold transition-colors duration-300 ${
                          darkMode ? "text-white" : "text-gray-800"
                        }`}
                      >
                        {location.postcode}
                      </div>
                      <div
                        className={`text-sm transition-colors duration-300 ${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {location.area}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <div
            className={`rounded-2xl p-4 border transition-all duration-300 relative ${
              darkMode
                ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-300/30"
                : "bg-gradient-to-r from-blue-100/80 to-purple-100/80 border-blue-200/50"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <MapPin
                  className={`w-5 h-5 transition-colors duration-300 ${
                    darkMode ? "text-blue-400" : "text-blue-600"
                  }`}
                />
                <div>
                  <div
                    className={`font-semibold transition-colors duration-300 ${
                      darkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {selectedLocation.postcode}
                  </div>
                  <div
                    className={`text-sm transition-colors duration-300 ${
                      darkMode ? "text-blue-200" : "text-blue-700"
                    }`}
                  >
                    {selectedLocation.area}
                  </div>
                </div>
              </div>
              <button
                onClick={clearSearch}
                className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
                  darkMode
                    ? "text-gray-400 hover:text-red-400 hover:bg-red-500/20"
                    : "text-gray-500 hover:text-red-500 hover:bg-red-100"
                }`}
                title="Clear"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label
                className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                <MapPin className="inline w-4 h-4 mr-2" />
                City
              </label>
              <input
                type="text"
                value={addressDetails.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 ${
                  darkMode
                    ? "bg-white/20 border-white/30 text-white placeholder-gray-300"
                    : "bg-gray-50/80 border-gray-300 text-gray-800 placeholder-gray-500"
                }`}
              />
            </div>

            <div>
              <label
                className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                <Building className="inline w-4 h-4 mr-2" />
                Street Name
              </label>
              <input
                type="text"
                placeholder="Ashby Road"
                value={addressDetails.streetName}
                onChange={(e) =>
                  handleInputChange("streetName", e.target.value)
                }
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 ${
                  darkMode
                    ? "bg-white/20 border-white/30 text-white placeholder-gray-300"
                    : "bg-gray-50/80 border-gray-300 text-gray-800 placeholder-gray-500"
                }`}
              />
            </div>

            <div>
              <label
                className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                <Home className="inline w-4 h-4 mr-2" />
                House/Flat Number
              </label>
              <input
                type="text"
                placeholder="197"
                value={addressDetails.houseNumber}
                onChange={(e) =>
                  handleInputChange("houseNumber", e.target.value)
                }
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 ${
                  darkMode
                    ? "bg-white/20 border-white/30 text-white placeholder-gray-300"
                    : "bg-gray-50/80 border-gray-300 text-gray-800 placeholder-gray-500"
                }`}
              />
            </div>
          </div>

          <button
            onClick={handleContinue}
            disabled={!isFormComplete}
            className={`w-full py-4 px-6 rounded-2xl font-semibold text-white transition-all duration-300 ${
              isFormComplete
                ? darkMode
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  : "bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600"
                : "bg-gray-500 cursor-not-allowed"
            } shadow-lg hover:shadow-xl transform hover:-translate-y-1`}
          >
            Continue →
          </button>
        </div>
      )}
    </div>
  );
}
