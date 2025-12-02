import { NextRequest, NextResponse } from "next/server";
import { sendReservationEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, date, time, guests } = body;

    // Validate required fields
    if (!name || !email || !phone || !date || !time || !guests) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    console.log("Reservation details:", {
      name,
      email,
      phone,
      date,
      time,
      guests,
    });
    // Send confirmation email
    const emailResult = await sendReservationEmail({
      name,
      email,
      phone,
      date,
      time,
      guests,
    });

    if (!emailResult.success) {
      console.error("Email sending failed with error:", emailResult.error);
      return NextResponse.json(
        {
          error: "Failed to send confirmation email",
          details: emailResult.error,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Reservation confirmed! Check your email for details.",
      reservation: {
        name,
        email,
        date,
        time,
        guests,
      },
    });
  } catch (error) {
    console.error("Reservation API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
