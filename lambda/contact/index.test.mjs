import { test, describe, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { SESv2Client } from "@aws-sdk/client-sesv2";

process.env.RECIPIENT_EMAIL = "to@example.com";
process.env.SENDER_EMAIL = "noreply@example.com";

const sentEmails = [];
SESv2Client.prototype.send = async (command) => {
  sentEmails.push(command.input);
  return {};
};

const { handler } = await import("./index.mjs");

const VALID_SUBMISSION = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  message: "I would like to discuss a role on our platform team. Are you available?",
  company: "",
  elapsedMs: 9000,
};

function submit(overrides = {}, isBase64Encoded = false) {
  const payload = JSON.stringify({ ...VALID_SUBMISSION, ...overrides });
  const body = isBase64Encoded ? Buffer.from(payload).toString("base64") : payload;
  return handler({ body, isBase64Encoded });
}

beforeEach(() => {
  sentEmails.length = 0;
});

describe("accepted submissions", () => {
  test("sends the notification and replies to the sender", async () => {
    const response = await submit();

    assert.equal(response.statusCode, 202);
    assert.equal(sentEmails.length, 1);
    assert.equal(sentEmails[0].ReplyToAddresses[0], VALID_SUBMISSION.email);
    assert.equal(sentEmails[0].Destination.ToAddresses[0], "to@example.com");
  });

  test("accepts a base64 encoded body", async () => {
    const response = await submit({}, true);

    assert.equal(response.statusCode, 202);
    assert.equal(sentEmails.length, 1);
  });
});

describe("automated submissions", () => {
  test("silently discards a filled honeypot", async () => {
    const response = await submit({ company: "spam-bot" });

    assert.equal(response.statusCode, 202);
    assert.equal(sentEmails.length, 0);
  });

  test("silently discards a form completed too quickly", async () => {
    const response = await submit({ elapsedMs: 400 });

    assert.equal(response.statusCode, 202);
    assert.equal(sentEmails.length, 0);
  });
});

describe("rejected submissions", () => {
  const invalidCases = [
    ["a blank name", { name: "   " }, "invalid_name"],
    ["an overlong name", { name: "x".repeat(101) }, "invalid_name"],
    ["a malformed email", { email: "not-an-email" }, "invalid_email"],
    ["a blank message", { message: "  " }, "invalid_message"],
    ["a message under twenty characters", { message: "hi" }, "message_too_short"],
    ["a message over five thousand characters", { message: "x".repeat(5001) }, "message_too_long"],
  ];

  for (const [description, overrides, expectedError] of invalidCases) {
    test(`rejects ${description}`, async () => {
      const response = await submit(overrides);

      assert.equal(response.statusCode, 400);
      assert.equal(JSON.parse(response.body).error, expectedError);
      assert.equal(sentEmails.length, 0);
    });
  }

  test("rejects a body that is not JSON", async () => {
    const response = await handler({ body: "{not json", isBase64Encoded: false });

    assert.equal(response.statusCode, 400);
    assert.equal(JSON.parse(response.body).error, "invalid_payload");
    assert.equal(sentEmails.length, 0);
  });
});
