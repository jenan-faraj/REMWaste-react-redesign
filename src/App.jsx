import { MultiStepForm } from "./componants/MultiStepForm";
import { AddressStep } from "./componants/steps/AddressStep";
import WasteTypeStep from "./componants/steps/WasteTypeStep";
import SkipSizeStep from "./componants/steps/SkipSizeStep";
import { SkipPlacementStep } from "./componants/steps/SkipPlacementStep";
import { DeliveryDateStep } from "./componants/steps/DeliveryDateStep";
import { OrderSummaryStep } from "./componants/steps/OrderSummaryStep";
import { ConfirmationStep } from "./componants/steps/ConfirmationStep";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51RWjbDBoiNdFyp9lrr93Uhih9zhfCw9Zo8TPjEHtDhKACyY0dPROudjKcrgqm58l2aKrDiYEfvpl6W4fwIoZFadX00lG4AWHDh"
);
import { useDarkMode } from "./hooks/useDarkMode";

function App() {
  const [darkMode, setDarkMode] = useDarkMode();

  const steps = [
    {
      name: "Postcode",
      component: (props) => <AddressStep {...props} darkMode={darkMode} />,
    },
    {
      name: "Waste Type",
      component: (props) => <WasteTypeStep {...props} darkMode={darkMode} />,
    },
    {
      name: "Select Skip",
      component: (props) => <SkipSizeStep {...props} darkMode={darkMode} />,
    },
    {
      name: "Permit Check",
      component: (props) => (
        <SkipPlacementStep {...props} darkMode={darkMode} />
      ),
    },
    {
      name: "Choose Date",
      component: (props) => <DeliveryDateStep {...props} darkMode={darkMode} />,
    },
    {
      name: "Payment",
      component: (props) => (
        <Elements stripe={stripePromise}>
          <OrderSummaryStep {...props} darkMode={darkMode} />
        </Elements>
      ),
    },
    {
      name: "Confirmation",
      component: (props) => <ConfirmationStep {...props} darkMode={darkMode} />,
    },
  ];

  return (
    <>
      <div
        className={`min-h-screen transition-all duration-500 flex flex-col ${
          darkMode
            ? "bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900"
            : "bg-gradient-to-br from-blue-300 via-blue-50 to-blue-300"
        }`}
      >
        <div className="flex-1 flex flex-col items-center justify-center px-5 p-2 sm:p-4 lg:p-8">
          <div className="relative w-full max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-none lg:mx-20">
            <MultiStepForm
              steps={steps}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />

            <div className="text-center mt-4 sm:mt-6">
              <span
                className={`text-xs sm:text-sm transition-colors duration-300 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Version 11.34
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
