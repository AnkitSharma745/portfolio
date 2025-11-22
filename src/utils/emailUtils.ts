import emailjs from "@emailjs/browser";

// Constants for EmailJS
const SERVICE_ID = "service_le3gsdmv";
const ADMIN_TEMPLATE_ID = "templsate_khgcmoe"; // Note: check spelling
const USER_TEMPLATE_ID = "temsdate_1fxcnew"; // Note: check spelling
const PUBLIC_KEY = "g6nJ18KZsdfZ1ErDTHk";

// Input types
interface EmailData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

// Return type
interface EmailResult {
  success: boolean;
  message: string;
}

// Main function
export const sendEmails = async ({
  firstName,
  lastName,
  email,
  phone,
  message,
}: EmailData): Promise<EmailResult> => {
  try {
    // Send to Admin
    const adminResponse = await emailjs.send(
      SERVICE_ID,
      ADMIN_TEMPLATE_ID,
      { firstName, lastName, email, phone, message },
      PUBLIC_KEY
    );
    console.log("Admin email sent successfully:", adminResponse);

    // Send Thank-you to User
    const userResponse = await emailjs.send(
      SERVICE_ID,
      USER_TEMPLATE_ID,
      { email, firstName },
      PUBLIC_KEY
    );
    console.log("Thank-you email sent successfully:", userResponse);

    return {
      success: true,
      message: "Emails sent successfully!",
    };
  } catch (error: unknown) {
    console.error("Failed to send emails:", error);

    let errorMessage = "Unknown error";
    if (typeof error === "object" && error !== null) {
      type EmailError = { text?: string; message?: string };
      const errObj = error as EmailError;
      if ("text" in errObj && typeof errObj.text === "string") {
        errorMessage = errObj.text;
      } else if ("message" in errObj && typeof errObj.message === "string") {
        errorMessage = errObj.message;
      }
    }

    return {
      success: false,
      message: `Failed to send emails: ${errorMessage}`,
    };
  }
};
