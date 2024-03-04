const nodemailer = require("nodemailer");

// Nodemailer
const emailSender = process.env.EMAIL_SENDER;
const smtpHost = process.env.SMTP_HOST;
const smtpPort = process.env.SMTP_PORT;
const pass = process.env.SMTP_HOST_PASSWORD;

const styles = {
  table:
    "border-collapse:collapse;border:2px solid rgb(140 140 140);font-family: sans-serif;font-size: 0.8rem;letter-spacing: 1px;background-color: rgb(237 238 242);",
  caption: "caption-side:bottom;padding:10px;font-weight: bold;",
  thead: "background-color:rgb(228 240 245);",
  tfoot: "background-color: rgb(228 240 245);",
  th: "border: 1px solid rgb(160 160 160);padding: 8px 10px;",
  tr: "background-color: rgb(237 238 242);",
  td: "border: 1px solid rgb(160 160 160);padding: 8px 10px;",
  tdlast: "text-align: center;",
};

// Connection Data for creating a transporter
const connectionData = {
  host: smtpHost,
  port: smtpPort,
  secure: true, // true for 465, false for other ports
  auth: {
    user: emailSender,
    pass: pass,
  },
  tls: {
    rejectUnauthorized: false,
  },
};

module.exports.sendVerificationEmail = async (email, options) => {
  const transporter = await nodemailer.createTransport(connectionData);
  const mailOptions = {
    from: "AB Blomsterhandeln Flora <blommor@flora.se>",
    to: email,
    subject: options.subject,
    text: options.message,
    html: `<table style=${styles.table}>
    <caption style=${styles.caption}>
      AB Blomsterhandeln Flora
    </caption>
    <thead style=${styles.thead}>
      <tr style="background-color: rgb(237 238 242);">
        <th style=${styles.th}>${options.message}</th>
      </tr>
    </thead>
    <tbody>
      <tr style=${styles.tr}>
        <th style=${styles.th}><a href=${options.url}><p>${options.subject} here!</p></a></th>
      </tr>
    </tbody>
    <tfoot style=${styles.tfoot}>
      <tr style=${styles.tr}>
        <th style=${styles.th} scope="row">*******************</th>
      </tr>
    </tfoot>
  </table>`,
  };

  return await transporter.sendMail(mailOptions);
};
