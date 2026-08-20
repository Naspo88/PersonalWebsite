import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

const ses = new SESv2Client({});

const MIN_MESSAGE_LENGTH = 20;
const MAX_MESSAGE_LENGTH = 5000;
const MAX_NAME_LENGTH = 100;
const MIN_FILL_TIME_MS = 3000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function handler(event) {
  const submission = parseBody(event);

  if (!submission) {
    return respond(400, { error: "invalid_payload" });
  }

  if (looksAutomated(submission)) {
    return respond(202, { status: "accepted" });
  }

  const validationError = validate(submission);
  if (validationError) {
    return respond(400, { error: validationError });
  }

  await sendNotification(submission);
  return respond(202, { status: "accepted" });
}

function parseBody(event) {
  try {
    const raw = event.isBase64Encoded
      ? Buffer.from(event.body ?? "", "base64").toString("utf8")
      : (event.body ?? "");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function looksAutomated({ company, elapsedMs }) {
  const filledHoneypot = typeof company === "string" && company.trim() !== "";
  const submittedTooFast = typeof elapsedMs === "number" && elapsedMs < MIN_FILL_TIME_MS;
  return filledHoneypot || submittedTooFast;
}

function validate({ name, email, message }) {
  if (!isFilledString(name) || name.length > MAX_NAME_LENGTH) return "invalid_name";
  if (!isFilledString(email) || !EMAIL_PATTERN.test(email)) return "invalid_email";
  if (!isFilledString(message)) return "invalid_message";
  if (message.trim().length < MIN_MESSAGE_LENGTH) return "message_too_short";
  if (message.length > MAX_MESSAGE_LENGTH) return "message_too_long";
  return null;
}

function isFilledString(value) {
  return typeof value === "string" && value.trim() !== "";
}

async function sendNotification({ name, email, message }) {
  await ses.send(
    new SendEmailCommand({
      FromEmailAddress: process.env.SENDER_EMAIL,
      Destination: { ToAddresses: [process.env.RECIPIENT_EMAIL] },
      ReplyToAddresses: [email],
      Content: {
        Simple: {
          Subject: { Data: `Website contact from ${name}`, Charset: "UTF-8" },
          Body: {
            Text: {
              Data: `From: ${name} <${email}>\n\n${message}`,
              Charset: "UTF-8",
            },
          },
        },
      },
    }),
  );
}

function respond(statusCode, payload) {
  return {
    statusCode,
    headers: {
      "content-type": "application/json",
      "cache-control": "no-store",
    },
    body: JSON.stringify(payload),
  };
}
