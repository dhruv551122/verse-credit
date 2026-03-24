import { NextRequest, NextResponse } from "next/server";
import { BrevoClient } from "@getbrevo/brevo";

const brevo = new BrevoClient({ apiKey: process.env.BREVO_API_KEY || "" });

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.json();
    if (!formData) {
      return NextResponse.json(
        { success: false, message: "Couldn't recieve any data " },
        { status: 401 },
      );
    }
    const { firstName, lastName, email, phoneNo, message } = formData;
    const from = process.env.BREVO_MAIL_FROM;
    const to = process.env.BREVO_MAIL_TO;

    if (!from?.trim() || !to?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Configuration for email sending is not set properly.",
        },
        { status: 501 },
      );
    }

    const { messageId } = await brevo.transactionalEmails.sendTransacEmail({
      sender: {
        email: from,
        name: "Verse Credit",
      },
      to: [{
        email: to,
        name: "Verse Credit",
      }],
      subject: "Contact form submission",
      replyTo: {
        email: from,
        name: "Verse Credit",
      },
      htmlContent: `<div className="font-mono">
      <h2>Contact form submission</h2>
      <div className="flex items-center gap-2">
        <strong>First Name:</strong>
        <span>${firstName}</span>
      </div>
      <div className="flex items-center gap-2">
        <strong>Last Name:</strong>
        <span>${lastName}</span>
      </div>
      <div className="flex items-center gap-2">
        <strong>Email:</strong>
        <span>${email}</span>
      </div>
      <div className="flex items-center gap-2">
        <strong>Phone no:</strong>
        <span>${phoneNo}</span>
      </div>
      <div className="flex items-center gap-2">
        <strong>Message:</strong>
        <span>${message}</span>
      </div>
    </div>`,
    });

    if (!messageId) {
      return NextResponse.json(
        { success: false, message: "Failed to send email" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Contact form submitted successfully",
    });
  } catch (error: unknown) {
    console.error("Error sending email:", error);

    const errorMessage = "Failed to send email." + error;

    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 },
    );
  }
};
