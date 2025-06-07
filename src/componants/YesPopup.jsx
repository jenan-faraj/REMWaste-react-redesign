import React, { useState } from "react";
import PlasterboardPopup from "./PlasterboardPopup";

const YesPopup = ({ onClose, darkMode, nextStep }) => {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showPlasterboardPopup, setShowPlasterboardPopup] = useState(false);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    if (answer === "Yes") {
      setShowPlasterboardPopup(true);
    } else {
      nextStep();
      onClose(answer);
    }
  };

  const handlePlasterboardClose = (percentage) => {
    setShowPlasterboardPopup(false);
    onClose(percentage ? `Yes - ${percentage}` : "");
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

        <div className="mb-8 text-center">
          <h2 className="text-xl font-semibold">
            Do You Have Any Plasterboard?
          </h2>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => handleAnswerSelect("Yes")}
            className={`flex-1 py-4 px-6 rounded-lg font-medium ${
              selectedAnswer === "Yes"
                ? darkMode
                  ? "bg-blue-600 text-white"
                  : "bg-blue-500 text-white"
                : darkMode
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Yes
          </button>
          <button
            onClick={() => handleAnswerSelect("No")}
            className={`flex-1 py-4 px-6 rounded-lg font-medium ${
              selectedAnswer === "No"
                ? darkMode
                  ? "bg-blue-600 text-white"
                  : "bg-blue-500 text-white"
                : darkMode
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            No
          </button>
        </div>
      </div>

      {showPlasterboardPopup && (
        <PlasterboardPopup
          onClose={handlePlasterboardClose}
          darkMode={darkMode}
          nextStep={nextStep}
        />
      )}
    </div>
  );
};

export default YesPopup;
