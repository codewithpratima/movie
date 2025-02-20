declare namespace google {
  namespace payments {
    namespace api {
      class PaymentsClient {
        constructor(config: { environment: "TEST" | "PRODUCTION" });
        loadPaymentData(paymentDataRequest: any): Promise<any>;
      }
    }
  }
}
