import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../Provider/AuthProvider";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Checkout = ({ price, classess }) => {
  const stripe = useStripe();
  const { user } = useContext(AuthContext);
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [axiosSecure] = useAxiosSecure();
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    axiosSecure.post("/create-payment-intent", { price })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      })
      .catch(err => console.error("Payment intent error:", err));
  }, [price, axiosSecure]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    setProcessing(true);
    setCardError("");

    try {
      // Create payment method
      const { error: paymentMethodError } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });

      if (paymentMethodError) {
        setCardError(paymentMethodError.message);
        setProcessing(false);
        return;
      }

      // Confirm payment
      const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card,
            billing_details: {
              email: user?.email || "unknown",
              name: user?.displayName || "anonymous",
            },
          },
        }
      );

      if (confirmError) {
        setCardError(confirmError.message);
        setProcessing(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);
        setPaymentSuccess(true);

        const paymentInfo = {
          email: user?.email,
          transactionId: paymentIntent.id,
          price,
          quantity: classess.length,
          date: new Date(),
          classId: classess.map((item) => item._id),
          classItem: classess.map((item) => item.ClassId),
          className: classess.map((item) => item.className),
        };

        await axiosSecure.post("/payment", paymentInfo);
        Swal.fire({
          title: "Payment Successful!",
          text: "Your enrollment has been confirmed",
          icon: "success",
          confirmButtonColor: "#4f46e5",
        });
      }
    } catch (error) {
      console.error("Payment error:", error);
      setCardError("An unexpected error occurred. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 sm:p-6"
      >
        <h3 className="text-lg font-medium text-gray-800 mb-4">Payment Details</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <div className="border border-gray-200 rounded-lg p-3 sm:p-4 bg-gray-50">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#374151",
                      "::placeholder": {
                        color: "#9CA3AF",
                      },
                      iconColor: "#4f46e5",
                    },
                    invalid: {
                      color: "#EF4444",
                      iconColor: "#EF4444",
                    },
                  },
                  hidePostalCode: true,
                }}
              />
            </div>
            {cardError && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-sm mt-2 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {cardError}
              </motion.p>
            )}
          </div>

          <button
            className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${
              processing || !stripe 
                ? "bg-indigo-400 cursor-not-allowed" 
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
            type="submit"
            disabled={!stripe || processing}
          >
            {processing ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              `Pay $${price.toFixed(2)}`
            )}
          </button>
        </form>

        {paymentSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 p-4 bg-green-50 rounded-lg border border-green-100"
          >
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <h4 className="font-medium text-green-800">Payment Successful</h4>
                <p className="text-sm text-green-600 mt-1">
                  Transaction ID: <span className="font-mono">{transactionId}</span>
                </p>
              </div>
            </div>
          </motion.div>
        )}

        <div className="mt-6 pt-6 border-t border-gray-100">
          <h4 className="text-sm font-medium text-gray-500 mb-3">Secure Payment</h4>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center text-xs text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              SSL Secure
            </div>
            <div className="flex items-center text-xs text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm3 1h6v4H6V6zm0 6h6v4H6v-4zm8-6h2v4h-2V6zm0 6h2v4h-2v-4z" clipRule="evenodd" />
              </svg>
              PCI Compliant
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Checkout;