import { useState } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

export function OrderSummaryStep({ prevStep, nextStep, darkMode }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [saveCard, setSaveCard] = useState(false);

  const deliveryDate = localStorage.getItem("deliveryDate");
  const collectionDate = localStorage.getItem("collectionDate");
  const skipHireAddress = JSON.parse(localStorage.getItem("skipHireAddress"));
  const selectedSkip = JSON.parse(localStorage.getItem("selectedSkip"));
  const roadPermitFee = 84.0;

  const subtotal = selectedSkip.price_before_vat + roadPermitFee;
  const vat = subtotal * 0.2;
  const total = subtotal + vat;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);
    setPaymentError(null);

    try {
      const cardNumberElement = elements.getElement(CardNumberElement);
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardNumberElement,
      });

      if (error) {
        setPaymentError(error.message);
        setIsProcessing(false);
        return;
      }

      setTimeout(() => {
        setIsProcessing(false);
        setPaymentSuccess(true);

        setTimeout(() => {
          nextStep({
            paymentStatus: "completed",
            paymentMethod: "card",
            last4: paymentMethod.card.last4,
            totalAmount: total,
          });
        }, 2000);
      }, 1500);
    } catch (err) {
      setPaymentError(err.message);
      setIsProcessing(false);
    }
  };

  const elementStyle = {
    base: {
      fontSize: "16px",
      color: darkMode ? "#ffffff" : "#1a1a1a",
      "::placeholder": {
        color: "#a0aec0",
      },
    },
  };

  if (paymentSuccess) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div
          className={`text-center py-12 max-w-md mx-auto px-4 ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          <div
            className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
              darkMode
                ? "bg-green-900/30 text-green-400"
                : "bg-green-100 text-green-600"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
          <p
            className={`text-lg ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Your order is being confirmed...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div
        className={`w-full max-w-6xl mx-auto px-4 py-8 ${
          darkMode ? "text-white" : "text-gray-800"
        }`}
      >
        <h1 className="text-xl font-bold mb-6">Order Summary</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2">
            <div
              className={`p-6 rounded-lg ${
                darkMode ? "bg-gray-800/50" : "bg-gray-50/30"
              }`}
            >
              <div className="space-y-4">
                <div>
                  <h2 className="font-semibold text-sm mb-1">
                    Delivery Address
                  </h2>
                  <p className="text-sm">
                    {skipHireAddress.houseNumber} {skipHireAddress.streetName}
                  </p>
                  <p className="text-sm">{skipHireAddress.city}</p>
                  <p className="text-sm">{skipHireAddress.postcode}</p>
                </div>

                <div>
                  <h2 className="font-semibold text-sm mb-1">
                    Delivery & Collection
                  </h2>
                  <p className="text-sm">Delivery: {deliveryDate}</p>
                  <p className="text-sm">Collection: {collectionDate}</p>
                </div>

                <hr
                  className={`my-2 ${
                    darkMode ? "border-gray-600" : "border-gray-300"
                  }`}
                />

                <div>
                  <h2 className="font-semibold text-sm mb-1">
                    {selectedSkip.size} Yard Skip
                  </h2>
                  <p className="text-sm">
                    {selectedSkip.hire_period_days} day hire period
                  </p>
                  <p className="text-sm font-bold">
                    £{selectedSkip.price_before_vat.toFixed(2)}
                  </p>
                  <p className="text-sm">
                    + VAT £{(selectedSkip.price_before_vat * 0.2).toFixed(2)}
                  </p>
                </div>

                <hr
                  className={`my-2 ${
                    darkMode ? "border-gray-600" : "border-gray-300"
                  }`}
                />

                <div>
                  <h3 className="font-semibold text-sm mb-2">
                    Additional Charges
                  </h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Road Permit Fee</span>
                      <span>£{roadPermitFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>VAT</span>
                      <span>£{(roadPermitFee * 0.2).toFixed(2)}</span>
                    </div>
                  </div>

                  <hr
                    className={`my-2 ${
                      darkMode ? "border-gray-600" : "border-gray-300"
                    }`}
                  />

                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal (excl. VAT)</span>
                      <span>£{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>VAT (20%)</span>
                      <span>£{vat.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <hr
                  className={`my-2 ${
                    darkMode ? "border-gray-600" : "border-gray-300"
                  }`}
                />

                <div>
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>£{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2">
            <form
              onSubmit={handleSubmit}
              className={`p-6 rounded-lg ${
                darkMode ? "bg-gray-800/50" : "bg-gray-50/30"
              }`}
            >
              <h3 className="font-semibold text-sm mb-4">Payment Details</h3>

              <p
                className={`text-xs mb-4 ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                While entering card information, you'll be automatically
                advanced to the next form field when the current field is
                complete.
              </p>

              <div className="space-y-4">
                <div>
                  <label
                    className={`block mb-1 text-sm ${
                      darkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    Card number
                  </label>
                  <div
                    className={`p-2 border rounded-lg ${
                      darkMode
                        ? "bg-gray-700 border-gray-600"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    <CardNumberElement options={{ style: elementStyle }} />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Supported cards include Visa and Mastercard.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      className={`block mb-1 text-sm ${
                        darkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      Expiration date
                    </label>
                    <div
                      className={`p-2 border rounded-lg ${
                        darkMode
                          ? "bg-gray-700 border-gray-600"
                          : "bg-white border-gray-300"
                      }`}
                    >
                      <CardExpiryElement options={{ style: elementStyle }} />
                    </div>
                  </div>

                  <div>
                    <label
                      className={`block mb-1 text-sm ${
                        darkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      Security code
                    </label>
                    <div
                      className={`p-2 border rounded-lg ${
                        darkMode
                          ? "bg-gray-700 border-gray-600"
                          : "bg-white border-gray-300"
                      }`}
                    >
                      <CardCvcElement options={{ style: elementStyle }} />
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    className={`block mb-1 text-sm ${
                      darkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    Country
                  </label>
                  <select
                    className={`w-full p-2 text-sm border rounded-lg ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    <option>Jordan</option>
                    <option>United Kingdom</option>
                    <option>United States</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="saveCard"
                    checked={saveCard}
                    onChange={(e) => setSaveCard(e.target.checked)}
                    className="mr-2"
                  />
                  <label
                    htmlFor="saveCard"
                    className={`text-xs ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Save this card as default payment method
                  </label>
                </div>

                {paymentError && (
                  <div
                    className={`p-2 text-sm rounded-lg ${
                      darkMode
                        ? "bg-red-900/50 text-red-300"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {paymentError}
                  </div>
                )}

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    className={`px-4 py-2 text-sm rounded-lg font-medium ${
                      darkMode
                        ? "bg-gray-700 hover:bg-gray-600 text-white"
                        : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                    }`}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={!stripe || isProcessing}
                    className={`px-4 py-2 text-sm rounded-lg font-medium text-white ${
                      !stripe || isProcessing
                        ? "bg-gray-500 cursor-not-allowed"
                        : darkMode
                        ? "bg-blue-600 hover:bg-blue-500"
                        : "bg-blue-500 hover:bg-blue-600"
                    }`}
                  >
                    {isProcessing ? "Processing..." : "Complete Payment"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
