let razorpayInstance: {
  orders: {
    create: (options: { amount: number; currency: string; receipt?: string }) => Promise<{
      id: string;
      amount: number;
      currency: string;
    }>;
  };
} | null = null;

try {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (
    typeof keyId === "string" &&
    typeof keySecret === "string" &&
    keyId.startsWith("rzp_")
  ) {
    const Razorpay = require("razorpay");

    razorpayInstance = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    console.log("Razorpay initialized");
  } else {
    console.log("Razorpay running in DEMO mode");
  }
} catch (error) {
  console.log(
    "Razorpay init error:",
    error instanceof Error ? error.message : "Unknown error"
  );
}

export { razorpayInstance };
