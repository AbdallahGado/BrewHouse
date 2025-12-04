import { NextRequest, NextResponse } from "next/server";
import { sendGiftCardEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { recipientName, recipientEmail, senderName, amount, message } = body;

    // Validate required fields
    if (!recipientName || !recipientEmail || !senderName || !amount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(recipientEmail)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Validate amount
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount < 10 || parsedAmount > 500) {
      return NextResponse.json(
        { error: "Amount must be between $10 and $500" },
        { status: 400 }
      );
    }

    // Generate unique gift card code
    const code = `BH${Date.now().toString(36).toUpperCase()}`;


    // Send gift card email
    const emailResult = await sendGiftCardEmail({
      recipientName,
      recipientEmail,
      senderName,
      amount: parsedAmount,
      code,
      message,
    });

    if (!emailResult.success) {
      console.error("Email sending failed with error:", emailResult.error);
      return NextResponse.json(
        {
          error: "Failed to send gift card email",
          details: emailResult.error,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Gift card sent successfully! The recipient will receive an email shortly.",
      giftCard: {
        recipientName,
        recipientEmail,
        senderName,
        amount: parsedAmount,
        code,
      },
    });
  } catch (error) {
    console.error("Gift card API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
