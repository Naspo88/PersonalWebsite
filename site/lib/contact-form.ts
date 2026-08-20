import type { Dictionary } from "@/lib/i18n";

export type ContactValues = {
  name: string;
  email: string;
  message: string;
  company: string;
};

export type ContactErrors = Partial<Record<"name" | "email" | "message", string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MIN_MESSAGE_LENGTH = 20;

export function validateContactForm(values: ContactValues, dictionary: Dictionary): ContactErrors {
  const messages = dictionary.contact.errors;
  const errors: ContactErrors = {};

  if (values.name.trim() === "") {
    errors.name = messages.nameRequired;
  }

  if (values.email.trim() === "") {
    errors.email = messages.emailRequired;
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = messages.emailInvalid;
  }

  if (values.message.trim() === "") {
    errors.message = messages.messageRequired;
  } else if (values.message.trim().length < MIN_MESSAGE_LENGTH) {
    errors.message = messages.messageTooShort;
  }

  return errors;
}
