import { useState } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

export function OrderSummaryStep({ prevStep, darkMode }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [saveCard, setSaveCard] = useState(false);
  const deliveryDate = localStorage.getItem("deliveryDate");
  const collectionDate = localStorage.getItem("collectionDate");
  const skipHireAddress = JSON.parse(localStorage.getItem("skipHireAddress"));
  const selectedSkip = JSON.parse(localStorage.getItem("selectedSkip"));
  const selectedWasteTypes = JSON.parse(
    localStorage.getItem("selectedWasteTypes")
  );
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

      console.log("PaymentMethod:", paymentMethod);

      setTimeout(() => {
        setIsProcessing(false);
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

  return (
    <div className={`space-y-6 ${darkMode ? "text-white" : "text-gray-800"}`}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">Order Summary</h1>

        <div className="mb-6">
          <h2 className="font-semibold mb-1">Delivery Address</h2>
          <p>
            {skipHireAddress.houseNumber} {skipHireAddress.streetName}
          </p>
          <p>{skipHireAddress.city}</p>
          <p>{skipHireAddress.postcode}</p>
        </div>

        <div className="mb-6">
          <h2 className="font-semibold mb-1">Delivery & Collection</h2>
          <p>Delivery: {deliveryDate}</p>
          <p>Collection: {collectionDate}</p>
        </div>

        <hr
          className={`my-4 ${darkMode ? "border-gray-600" : "border-gray-300"}`}
        />

        <div className="mb-6">
          <h2 className="font-semibold text-lg mb-1">
            {selectedSkip.size} Yard Skip
          </h2>
          <p>{selectedSkip.hire_period_days} day hire period</p>
          <p className="font-bold">
            £{selectedSkip.price_before_vat.toFixed(2)}
          </p>
          <p>+ VAT £{(selectedSkip.price_before_vat * 0.2).toFixed(2)}</p>
        </div>

        <hr
          className={`my-4 ${darkMode ? "border-gray-600" : "border-gray-300"}`}
        />

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Additional Charges</h3>
          <table className="w-full mb-2">
            <tbody>
              <tr>
                <td>Road Permit Fee</td>
                <td className="text-right">£{roadPermitFee.toFixed(2)}</td>
              </tr>
              <tr>
                <td></td>
                <td className="text-right">
                  + VAT £{(roadPermitFee * 0.2).toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>

          <table className="w-full">
            <tbody>
              <tr>
                <td>Subtotal (excl. VAT)</td>
                <td className="text-right">£{subtotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td>VAT (20%)</td>
                <td className="text-right">£{vat.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <hr
          className={`my-4 ${darkMode ? "border-gray-600" : "border-gray-300"}`}
        />

        <div className="mb-6">
          <h3 className="font-semibold">Total</h3>
          <p className="text-xl font-bold">£{total.toFixed(2)}</p>
        </div>

        <hr
          className={`my-4 ${darkMode ? "border-gray-600" : "border-gray-300"}`}
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <h3 className="font-semibold text-lg">Payment Details</h3>

        <p
          className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}
        >
          While entering card information, you'll be automatically advanced to
          the next form field when the current field is complete.
        </p>

        <div>
          <label
            className={`block mb-1 ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Card number
          </label>
          <div
            className={`p-3 border rounded-lg ${
              darkMode
                ? "bg-gray-700 border-gray-600"
                : "bg-gray-50 border-gray-300"
            }`}
          >
            <CardNumberElement options={{ style: elementStyle }} />
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Supported cards include Visa and Mastercard.
          </p>
        </div>

        <div>
          <label
            className={`block mb-1 ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Expiration date
          </label>
          <div
            className={`p-3 border rounded-lg ${
              darkMode
                ? "bg-gray-700 border-gray-600"
                : "bg-gray-50 border-gray-300"
            }`}
          >
            <CardExpiryElement options={{ style: elementStyle }} />
          </div>
        </div>

        <div>
          <label
            className={`block mb-1 ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Security code
          </label>
          <div
            className={`p-3 border rounded-lg ${
              darkMode
                ? "bg-gray-700 border-gray-600"
                : "bg-gray-50 border-gray-300"
            }`}
          >
            <CardCvcElement options={{ style: elementStyle }} />
          </div>
          <p className="text-sm text-gray-500 mt-1">
            3-digit code on back of card
          </p>
        </div>

        <div>
          <label
            className={`block mb-1 ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Country
          </label>
          <select
            className={`w-full p-3 border rounded-lg ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-gray-50 border-gray-300"
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
            className={`text-sm ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Save this card as default payment method
          </label>
        </div>

        {paymentError && (
          <div
            className={`p-3 rounded-lg ${
              darkMode
                ? "bg-red-900/50 text-red-300"
                : "bg-red-100 text-red-600"
            }`}
          >
            {paymentError}
          </div>
        )}

        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={prevStep}
            className={`px-6 py-3 rounded-xl font-medium transition-colors ${
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
            className={`px-6 py-3 rounded-xl font-medium text-white transition-colors ${
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
      </form>
    </div>
  );
}
