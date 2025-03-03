// "use client";

// import { useState } from "react";
// import { Lock } from "lucide-react";
// import { useSession } from "next-auth/react";
// import { useEffect } from "react";

// import { useRouter } from "next/router";
// const paymentMethods = [
//   {
//     name: "Credit or Debit Card",
//     icons: ["/visa.png", "/mastercard.png"],
//   },
//   {
//     name: "UPI AutoPay",
//     icons: ["/bhim.png", "/paytm.png", "/amazonpay.png", "/gpay.png"],
//   },
// ];

// export default function PaymentOptions() {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     if (status === "unauthenticated") {
//       router.push("/auth"); // Redirect if not logged in
//     }
//   }, [status, router]);

//   if (status === "loading") return <p>Loading...</p>;
//   if (!session) return null;

//   return (
//     <div className="min-h-screen bg-white flex flex-col items-center p-6 text-center">
//       <h1 className="text-4xl font-bold text-gray-900">Choose how to pay</h1>
//       <p className="text-gray-600 mt-2">
//         Your payment is encrypted and you can change your payment method at any
//         time.
//       </p>
//       <p className="font-semibold mt-2">
//         Secure for peace of mind.
//         <br />
//         Cancel easily online.
//       </p>
//       <div className="mt-6 flex items-center text-sm text-gray-500">
//         <span>End-to-end encrypted</span>
//         <Lock className="ml-1 w-4 h-4 text-yellow-500" />
//       </div>
//       <div className="mt-6 w-full max-w-md">
//         {paymentMethods.map((method, index) => (
//           <div
//             key={index}
//             className="flex justify-between items-center p-4 border rounded-lg shadow-lg mb-4 cursor-pointer hover:shadow-xl"
//           >
//             <span className="text-gray-800 font-medium">{method.name}</span>
//             <div className="flex space-x-2">
//               {method.icons.map((icon, i) => (
//                 <img key={i} src={icon} alt="payment method" className="h-6" />
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import React from "react";

const payment = () => {
  return <div>hello</div>;
};

export default payment;
