import { CheckCircle, Home, Calendar, CreditCard, MapPin } from "lucide-react";

export function ConfirmationStep({ darkMode, formData, onBackToFirstStep }) {
  const deliveryDate = localStorage.getItem("deliveryDate");
  const collectionDate = localStorage.getItem("collectionDate");
  const skipHireAddress = JSON.parse(localStorage.getItem("skipHireAddress"));
  const selectedSkip = JSON.parse(localStorage.getItem("selectedSkip"));
  const paymentMethod = JSON.parse(localStorage.getItem("paymentMethod"));

  const subtotal = selectedSkip.price_before_vat;
  const vat = selectedSkip.price_before_vat * 0.2;
  const total = subtotal + vat;

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen py-8`}
    >
      <div
        className={`w-full max-w-lg mx-auto p-6 ${
          darkMode ? "text-white" : "text-gray-800"
        }`}
      >
        <div className="flex items-center justify-center mb-6">
          <div
            className={`p-4 rounded-full ${
              darkMode
                ? "bg-green-900/30 text-green-400"
                : "bg-green-100 text-green-600"
            }`}
          >
            <CheckCircle size={48} strokeWidth={1.5} />
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-2 text-center">
          Your Order is Confirmed!
        </h1>

        <p
          className={`text-sm mb-6 text-center ${
            darkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Thank you for your order. We've sent a confirmation email with all the
          details.
        </p>

        <div
          className={`p-4 rounded-lg border mb-6 ${
            darkMode
              ? "bg-gray-800/50 border-gray-600"
              : "bg-white/50 border-gray-200 shadow-sm"
          }`}
        >
          <h2 className="text-lg font-semibold mb-3">Order Summary</h2>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <MapPin
                className={`flex-shrink-0 mt-1 ${
                  darkMode ? "text-blue-400" : "text-blue-600"
                }`}
                size={18}
              />
              <div className="text-sm">
                <h3
                  className={`font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Delivery Address
                </h3>
                <p>
                  {skipHireAddress.houseNumber} {skipHireAddress.streetName}
                </p>
                <p>{skipHireAddress.city}</p>
                <p>{skipHireAddress.postcode}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Calendar
                className={`flex-shrink-0 mt-1 ${
                  darkMode ? "text-purple-400" : "text-purple-600"
                }`}
                size={18}
              />
              <div className="text-sm">
                <h3
                  className={`font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Delivery & Collection
                </h3>
                <p>Delivery: {deliveryDate}</p>
                <p>Collection: {collectionDate}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Home
                className={`flex-shrink-0 mt-1 ${
                  darkMode ? "text-yellow-400" : "text-yellow-600"
                }`}
                size={18}
              />
              <div className="text-sm">
                <h3
                  className={`font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Skip Details
                </h3>
                <p>
                  {selectedSkip.size} Yard Skip -{" "}
                  {selectedSkip.hire_period_days} day hire
                </p>
                <p>Total: £{total.toFixed(2)} (incl. VAT)</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <CreditCard
                className={`flex-shrink-0 mt-1 ${
                  darkMode ? "text-green-400" : "text-green-600"
                }`}
                size={18}
              />
              <div className="text-sm">
                <h3
                  className={`font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Payment Method
                </h3>
                <p>Card ending in {paymentMethod?.last4 || "1234"}</p>
                <p>Payment status: Completed</p>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`p-3 rounded-lg text-sm mb-6 ${
            darkMode
              ? "bg-blue-900/20 border border-blue-800"
              : "bg-blue-50 border border-blue-200"
          }`}
        >
          <h3 className="font-medium mb-1">What's Next?</h3>
          <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
            Our team will contact you shortly to confirm delivery details.
          </p>
        </div>

        <button
          onClick={onBackToFirstStep}
          className={`w-full py-2 rounded-lg font-medium ${
            darkMode
              ? "bg-blue-600 hover:bg-blue-500 text-white"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          Back to First Step
        </button>

        <p
          className={`text-xs mt-4 text-center ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Thank you for choosing our service.
        </p>
      </div>
    </div>
  );
}
