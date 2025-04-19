import { Elements } from "@stripe/react-stripe-js";
import { motion } from "framer-motion";
import { loadStripe } from "react-stripe-js";
import useClass from "../../../Hooks/useClass";
import Checkout from "./Checkout";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Payment = () => {
  const [classess] = useClass();
  const total = classess.reduce((add, item) => item.price + add, 0);
  const price = parseFloat(total.toFixed(2));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header Section */}
        <div className="text-center mb-10">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
          >
            Complete Your Enrollment
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-gray-600"
          >
            Secure payment for {classess.length} {classess.length === 1 ? 'class' : 'classes'}
          </motion.p>
          
          {/* Total Price Badge */}
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4 }}
            className="inline-block mt-6 bg-white px-6 py-3 rounded-full shadow-md border border-gray-200"
          >
            <span className="text-gray-600 mr-2">Total:</span>
            <span className="text-2xl font-bold text-indigo-600">${price}</span>
          </motion.div>
        </div>

        {/* Payment Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
        >
          <div className="p-2 bg-gradient-to-r from-indigo-600 to-purple-600">
            <h2 className="text-white text-lg font-medium text-center p-2">
              Secure Payment Gateway
            </h2>
          </div>
          
          <div className="p-6 md:p-8">
            <Elements stripe={stripePromise}>
              <Checkout classess={classess} price={price} />
            </Elements>
          </div>
        </motion.div>

        {/* Security Assurance */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 flex flex-wrap justify-center items-center gap-4 text-sm text-gray-500"
        >
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            Secure 256-bit SSL encryption
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm3 1h6v4H6V6zm0 6h6v4H6v-4zm8-6h2v4h-2V6zm0 6h2v4h-2v-4z" clipRule="evenodd" />
            </svg>
            PCI compliant payments
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Payment;