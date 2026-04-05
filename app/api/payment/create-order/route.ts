import { NextRequest, NextResponse } from "next/server";

import { razorpayInstance } from "@/lib/razorpay";

export async function POST(req: NextRequest) {
  let parsedAmount = 0;

  try {
    const { amount } = (await req.json()) as { amount?: number };
    parsedAmount = Number(amount);

    if (!amount || Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    if (!razorpayInstance) {
      return NextResponse.json({
        id: `demo_order_${Date.now()}`,
        amount: Math.round(parsedAmount * 100),
        currency: "INR",
        isDemo: true,
      });
    }

    const order = await razorpayInstance.orders.create({
      amount: Math.round(parsedAmount * 100),
      currency: "INR",
      receipt: `order_${Date.now()}`,
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);

    return NextResponse.json({
      id: `fallback_${Date.now()}`,
      amount: Math.round(parsedAmount * 100),
      currency: "INR",
      isDemo: true,
    });
  }
}
