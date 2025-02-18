"use client";

import { useState } from "react";

// const paymentsClient = new google.payments.api.PaymentsClient({
//   environment: "TEST",
// });

const paymentsClient = new (window as any).google.payments.api.PaymentsClient({
  environment: "TEST",
});

const paymentDataRequest = {
  apiVersion: 2,
  apiVersionMinor: 0,
  allowedPaymentMethods: [
    {
      type: "CARD",
      parameters: {
        allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
        allowedCardNetworks: ["VISA", "MASTERCARD"],
      },
      tokenizationSpecification: {
        type: "PAYMENT_GATEWAY",
        parameters: {
          gateway: "example",
          gatewayMerchantId: "exampleMerchantId",
        },
      },
    },
  ],
  merchantInfo: {
    merchantId: "your-merchant-id",
    merchantName: "Your Business Name",
  },
  transactionInfo: {
    totalPriceStatus: "FINAL",
    totalPrice: "10.00",
    currencyCode: "INR",
  },
};

const plans = [
  {
    name: "Mobile",
    resolution: "480p",
    price: 149,
    quality: "Fair",
    devices: "Mobile phone, tablet",
  },
  {
    name: "Basic",
    resolution: "720p",
    price: 199,
    quality: "Good",
    devices: "TV, computer, mobile phone, tablet",
    mostPopular: true,
  },
  {
    name: "Standard",
    resolution: "1080p",
    price: 499,
    quality: "Great",
    devices: "TV, computer, mobile phone, tablet",
  },
  {
    name: "Premium",
    resolution: "4K + HDR",
    price: 649,
    quality: "Best",
    devices: "TV, computer, mobile phone, tablet",
  },
];

async function onGooglePayButtonClick() {
  try {
    const paymentData = await paymentsClient.loadPaymentData(
      paymentDataRequest
    );
    console.log("Payment Success:", paymentData);
  } catch (err) {
    console.error("Payment Failed:", err);
  }
}

export default function PricingPlans() {
  const [selectedPlan, setSelectedPlan] = useState("Basic");

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-gray-900">
        Choose the plan that’s right for you
      </h1>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl w-full">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`p-6 border rounded-lg shadow-lg text-center cursor-pointer transition-all ${
              selectedPlan === plan.name
                ? "border-purple-500 shadow-xl"
                : "border-gray-300"
            }`}
            onClick={() => setSelectedPlan(plan.name)}
          >
            {plan.mostPopular && (
              <div className="bg-purple-500 text-white text-xs font-bold uppercase p-1 rounded-md mb-2">
                Most Popular
              </div>
            )}
            <h2 className="text-xl font-semibold text-gray-800">{plan.name}</h2>
            <p className="text-sm text-gray-600">{plan.resolution}</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              ₹{plan.price}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Video and sound quality: {plan.quality}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Devices: {plan.devices}
            </p>
          </div>
        ))}
      </div>
      <button
        onClick={onGooglePayButtonClick}
        className="mt-6 bg-red-700 text-white"
      >
        Next
      </button>
    </div>
  );
}
