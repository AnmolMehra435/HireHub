import transporter from "../config/email.js";
import { EMAIL_ENABLED, EMAIL_USER } from "../config/env.js";

const sendEmail = async ({ to, subject, html }) => {

    try{
        if(EMAIL_ENABLED !== "true"){
            console.log("\n====Email Dev Mode===");
            console.log("TO: ", to);
            console.log("Subject: ", subject);

            return{
                success: true,
                devMode: true
            };
        }

        await transporter.sendMail({
            from: EMAIL_USER,
            to,
            subject,
            html,
        });

        return {
            success: true
        }
    }catch(error){
        console.error("Email Error:", error.message);

        return {
            success: false,
            error: error.message,
        }
    }
};

export const sendApplicationConfirmation = async (
  candidateEmail,
  jobTitle,
  companyName
) => {
  const subject = `Application Received - ${jobTitle}`;

  const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>Application Received</h2>

      <p>
        Thank you for applying for
        <strong>${jobTitle}</strong>
        at
        <strong>${companyName}</strong>.
      </p>

      <p>
        We have successfully received your application and our team
        will review it shortly.
      </p>

      <p>
        If your profile matches the requirements, the employer may
        contact you regarding the next steps.
      </p>

      <p>
        Thank you for using HireHub.
      </p>
    </div>
  `;

  return sendEmail({
    to: candidateEmail,
    subject,
    html,
  });
};

export const sendNewApplicationAlert = async (
  employerEmail,
  candidateName,
  jobTitle
) => {
  const subject = `New Application for ${jobTitle}`;

  const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>New Application Received</h2>

      <p>
        <strong>${candidateName}</strong>
        has applied for
        <strong>${jobTitle}</strong>.
      </p>

      <p>
        Log in to HireHub to review the application
        and take further action.
      </p>

      <p>
        Thank you for using HireHub.
      </p>
    </div>
  `;

  return sendEmail({
    to: employerEmail,
    subject,
    html,
  });
};

export const sendApplicationStatusUpdate = async (
  candidateEmail,
  jobTitle,
  status
) => {
  const subject = `Application Status Update - ${jobTitle}`;

  let heading = "";
  let message = "";

  switch (status) {
    case "shortlisted":
      heading = "Congratulations!";
      message =
        "You have been shortlisted for the next stage of the hiring process.";
      break;

    case "reviewed":
      heading = "Application Reviewed";
      message =
        "Your application has been reviewed by the employer.";
      break;

    case "rejected":
      heading = "Application Update";
      message =
        "Unfortunately, your application was not selected for further consideration.";
      break;

    default:
      heading = "Application Status Updated";
      message = `Your application status is now: ${status}`;
  }

  const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>${heading}</h2>

      <p>
        Job:
        <strong>${jobTitle}</strong>
      </p>

      <p>
        ${message}
      </p>

      <p>
        Thank you for using HireHub.
      </p>
    </div>
  `;

  return sendEmail({
    to: candidateEmail,
    subject,
    html,
  });
};