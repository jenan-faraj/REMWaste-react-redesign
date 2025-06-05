import { useState } from "react";
export function MultiStepForm({ steps }) {
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
      <div className="flex justify-between items-center mb-6">
        {steps.map((step, index) => (
          <div
            key={step.name}
            className={`flex flex-col items-center ${
              index < currentStep ? "opacity-100" : "opacity-50"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                index <= currentStep
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-500"
              }`}
            >
              {index + 1}
            </div>
            <span
              className={`text-xs mt-1 transition-colors duration-300 ${
                index <= currentStep
                  ? "text-blue-500 font-medium"
                  : "text-gray-400"
              }`}
            >
              {step.name}
            </span>
          </div>
        ))}
      </div>

      <CurrentStepComponent
        nextStep={nextStep}
        prevStep={prevStep}
        formData={formData}
      />
    </div>
  );
}
