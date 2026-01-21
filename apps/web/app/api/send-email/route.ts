import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "");

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
    const from = process.env.RESEND_MAIL_FROM;
    const to = process.env.RESEND_MAIL_TO;

    if (!from?.trim() || !to?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Configuration for email sending is not set properly.",
        },
        { status: 501 },
      );
    }

    const { data, error } = await resend.emails.send({
      from: from,
      to: [to],
      subject: "Contact form submission",
      replyTo: email,
      html: `<div className="font-mono">
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

    if (error?.message) {
      return NextResponse.json(
        { success: false, message: error?.message },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Contact form submitted successfully",
    });
  } catch (error: any) {
    console.error("Error sending email:", error);

    const errorMessage =
      error?.response?.body?.errors?.[0]?.message ||
      error?.message ||
      "Failed to send email.";

    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 },
    );
  }
};
