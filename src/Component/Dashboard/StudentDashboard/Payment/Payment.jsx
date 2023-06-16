import { loadStripe } from "react-stripe-js";
import useClass from "../../../Hooks/useClass";
import { Elements } from "@stripe/react-stripe-js";
import Checkout from "./Checkout";


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);
const Payment = () => {
  const [classess] = useClass();
  const total = classess.reduce((add, item) => item.price + add, 0);
  const price = parseFloat(total.toFixed(2));
  return (
    <div className="mt-10">
      <h1 className="text-5xl font-bold"> Please Do Payment For Enroll </h1>
      <Elements stripe={stripePromise}>
        <Checkout classess={classess} price={price}></Checkout>
      </Elements>
    </div>
  );
};

export default Payment;
