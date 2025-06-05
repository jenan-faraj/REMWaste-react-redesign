import { Building } from "lucide-react";
import { DarkModeToggle } from "./componants/DarkModeToggle";
import { MultiStepForm } from "./componants/MultiStepForm";
import { AddressStep } from "./componants/steps/AddressStep";
import { WasteTypeStep } from "./componants/steps/WasteTypeStep";
import { SkipSizeStep } from "./componants/steps/SkipSizeStep";
import { SkipPlacementStep } from "./componants/steps/SkipPlacementStep";
import { useDarkMode } from "./hooks/useDarkMode";

function App() {
  const [darkMode, setDarkMode] = useDarkMode();

  const steps = [
    {
      name: "Address",
      component: (props) => <AddressStep {...props} darkMode={darkMode} />,
    },
    {
      name: "Waste Type",
      component: (props) => <WasteTypeStep {...props} darkMode={darkMode} />,
    },
    {
      name: "Skip Size",
      component: (props) => <SkipSizeStep {...props} darkMode={darkMode} />,
    },
    {
      name: "Placement",
      component: (props) => (
        <SkipPlacementStep {...props} darkMode={darkMode} />
      ),
    },
  ];

  return (
    <div
      className={`min-h-screen transition-all duration-500 flex items-center justify-center p-4 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900"
          : "bg-gradient-to-br from-blue-300 via-blue-50 to-blue-300"
      }`}
    >
      <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div
            className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 shadow-lg transition-all duration-300 ${
              darkMode
                ? "bg-gradient-to-r from-blue-500 to-purple-600"
                : "bg-gradient-to-r from-blue-400 to-purple-500"
            }`}
          >
            <Building className="w-8 h-8 text-white" />
          </div>
          <h1
            className={`text-5xl font-bold mb-2 tracking-tight transition-colors duration-300 ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            SKIP HIRE
          </h1>
          <p
            className={`text-xl italic font-light transition-colors duration-300 ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            With A Difference
          </p>
        </div>

        <div
          className={`backdrop-blur-lg rounded-3xl p-8 shadow-2xl border transition-all duration-300 ${
            darkMode
              ? "bg-white/10 border-white/20"
              : "bg-white/20 border-gray-200/50"
          }`}
        >
          <MultiStepForm steps={steps} />
        </div>

        <div className="text-center mt-6">
          <span
            className={`text-sm transition-colors duration-300 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Version 11.34
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
