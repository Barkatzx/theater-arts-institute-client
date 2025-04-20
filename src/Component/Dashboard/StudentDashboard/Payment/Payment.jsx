import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { motion } from "framer-motion";
import useClass from "../../../Hooks/useClass";
import Checkout from "./Checkout";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Payment = () => {
  const [classess] = useClass();
  const total = classess.reduce((add, item) => item.price + add, 0);
  const price = parseFloat(total.toFixed(2));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-12">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3"
          >
            Complete Your Enrollment
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-base md:text-lg text-gray-600 mb-6"
          >
            Secure payment for {classess.length} {classess.length === 1 ? 'class' : 'classes'}
          </motion.p>
          
          {/* Total Price Card */}
          {/* <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4 }}
            className="inline-flex flex-col items-center bg-white px-6 py-4 rounded-xl shadow-sm border border-gray-100"
          >
            <span className="text-gray-500 text-sm mb-1">Total Amount</span>
            <div className="flex items-baseline">
              <span className="text-2xl md:text-3xl font-bold text-indigo-600">${price}</span>
              <span className="text-gray-400 text-sm ml-1">USD</span>
            </div>
          </motion.div> */}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Summary - Visible on larger screens */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="hidden lg:block bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-fit"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h3>
            <div className="space-y-4">
              {classess.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="bg-indigo-100 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">{item.className}</h4>
                      <p className="text-xs text-gray-500">{item.instructorName}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-800">${item.price}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 mt-4 pt-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Subtotal</span>
                <span className="text-sm font-medium text-gray-800">${price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Tax</span>
                <span className="text-sm font-medium text-gray-800">$0.00</span>
              </div>
              <div className="flex justify-between mt-3 pt-3 border-t border-gray-100">
                <span className="text-base font-medium text-gray-800">Total</span>
                <span className="text-lg font-bold text-indigo-600">${price}</span>
              </div>
            </div>
          </motion.div>

          {/* Payment Form Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 lg:col-span-2"
          >
            <div className="p-4 bg-gradient-to-r from-indigo-600 to-purple-600">
              <h2 className="text-white text-lg font-medium text-center">
                Payment Information
              </h2>
            </div>
            
            <div className="p-5 sm:p-6 md:p-8">
              <Elements stripe={stripePromise}>
                <Checkout classess={classess} price={price} />
              </Elements>
            </div>
          </motion.div>
        </div>

        {/* Mobile Order Summary - Accordion */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="lg:hidden mt-6 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <details className="group">
            <summary className="flex justify-between items-center p-4 cursor-pointer list-none">
              <span className="text-base font-medium text-gray-800">View Order Details</span>
              <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </summary>
            <div className="px-4 pb-4">
              <div className="space-y-4">
                {classess.map((item, index) => (
                  <div key={index} className="flex justify-between items-center pt-3">
                    <div className="flex items-center">
                      <div className="bg-indigo-100 w-8 h-8 rounded-lg flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">{item.className}</h4>
                        <p className="text-xs text-gray-500">{item.instructorName}</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-800">${item.price}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 mt-4 pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Subtotal</span>
                  <span className="text-sm font-medium text-gray-800">${price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Tax</span>
                  <span className="text-sm font-medium text-gray-800">$0.00</span>
                </div>
                <div className="flex justify-between mt-3 pt-3 border-t border-gray-100">
                  <span className="text-base font-medium text-gray-800">Total</span>
                  <span className="text-lg font-bold text-indigo-600">${price}</span>
                </div>
              </div>
            </div>
          </details>
        </motion.div>

        {/* Security Assurance */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4 text-sm text-gray-500"
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
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Money-back guarantee
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Payment;