import { useState } from "react";
import { DarkModeToggle } from "../componants/DarkModeToggle";

export function MultiStepForm({ steps, darkMode, setDarkMode }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});

  const nextStep = (data = {}) => {
    setFormData({ ...formData, ...data });
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="space-y-6">
      <div
        className={`fixed backdrop-blur-md top-0 left-0 right-0 z-50 px-4 py-4 transition-all duration-300 ${
          darkMode ? "bg-gray-800/50" : "bg-white/50"
        } shadow-md`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex-1 flex justify-between items-center px-4">
            {steps.map((step, index) => (
              <div
                key={step.name}
                className={`flex flex-col items-center ${
                  index < currentStep ? "opacity-100" : "opacity-50"
                }`}
              >
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    index <= currentStep
                      ? "bg-blue-500 text-white"
                      : darkMode
                      ? "bg-gray-600 text-gray-300"
                      : "bg-gray-300 text-gray-500"
                  }`}
                >
                  {index + 1}
                </div>
                <span
                  className={`text-xs mt-1 transition-colors duration-300 hidden sm:block text-center ${
                    index <= currentStep
                      ? "text-blue-500 font-medium"
                      : darkMode
                      ? "text-gray-400"
                      : "text-gray-400"
                  }`}
                >
                  {step.name}
                </span>
              </div>
            ))}
          </div>

          <div className="ml-4 flex-shrink-0">
            <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
          </div>
        </div>
      </div>

      <div className="pt-24">
        {" "}
        <CurrentStepComponent
          nextStep={nextStep}
          prevStep={prevStep}
          formData={formData}
        />
      </div>
    </div>
  );
}
