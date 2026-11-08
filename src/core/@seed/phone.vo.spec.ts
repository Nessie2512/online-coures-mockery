import { describe, expect, it } from 'vitest';
import { PhoneNumber } from './phone.vo';

describe('PhoneNumber', () => {
  it.each(['923000000', '+244 923 000 000', '244923000000'])(
    'normalizes valid Angolan numbers (%s)',
    (input) => {
      expect(new PhoneNumber(input).value).toBe('+244923000000');
    },
  );

  it('requires a number', () => {
    expect(() => new PhoneNumber('')).toThrow('Phone number is required.');
  });

  it.each(['823000000', '92300000', '9230000000'])(
    'rejects invalid numbers (%s)',
    (input) => {
      expect(() => new PhoneNumber(input)).toThrow(
        'Invalid Angolan phone number format. Must be a 9-digit number starting with 2 or 9.',
      );
    },
  );
});
