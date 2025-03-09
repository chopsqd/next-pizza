import { Resend } from "resend";

const resend = (() => {
  // if (!process.env.RESEND_API_KEY) {
  //   throw new Error('RESEND_API_KEY is not defined');
  // }
  // return new Resend(process.env.RESEND_API_KEY);
  return new Resend("re_123");
})();

export const sendEmail = async (to: string, subject: string, html: string) => {
  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to,
    subject,
    html
  });

  if (error) {
    throw new Error(`Failed to send email: ${(error as Error).message}`);
  }

  return data;
};