import { valueObject } from './ValueObject';

export class Email extends valueObject<string> {
  constructor(value: string) {
    if (!value) {
      throw new Error('Email address is required.');
    }

    const sanitizedEmail = value.trim().toLowerCase();

    // Standard email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitizedEmail)) {
      throw new Error('Invalid email address format.');
    }

    super(sanitizedEmail);
  }

  public equals(otherEmail: valueObject<string>): boolean {
    if (!otherEmail) return false;
    return this.value === otherEmail.value;
  }
}
