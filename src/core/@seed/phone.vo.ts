import { valueObject } from './ValueObject';

export class PhoneNumber extends valueObject<string> {
  constructor(value: string) {
    if (!value) {
      throw new Error('Phone number is required.');
    }

    // 1. Limpeza de caracteres estruturais (Remove espaços, traços, etc.)
    let sanitizedPhone = value.replace(/[\s()-]/g, '');

    // 2. Se o número começar com o indicativo internacional de Angola, extrai para validar o corpo
    if (sanitizedPhone.startsWith('+244')) {
      sanitizedPhone = sanitizedPhone.substring(4);
    } else if (sanitizedPhone.startsWith('244') && sanitizedPhone.length === 12) {
      sanitizedPhone = sanitizedPhone.substring(3);
    }

    // 3. Validação do padrão Angolano (Deve ter exatamente 9 dígitos e começar com 2 ou 9)
    // ^[29] -> Começa com 2 ou 9
    // \d{8}\$ -> Seguido de exatamente mais 8 dígitos (Total = 9)
    const angolaPhoneRegex = /^[29]\d{8}$/;
    if (!angolaPhoneRegex.test(sanitizedPhone)) {
      throw new Error('Invalid Angolan phone number format. Must be a 9-digit number starting with 2 or 9.');
    }

    // 4. Armazena sempre no formato internacional padronizado (E.164) para consistência
    const finalFormattedNumber = `+244${sanitizedPhone}`;

    super(finalFormattedNumber);
  }

  public equals(otherPhone: valueObject<string>): boolean {
    if (!otherPhone) return false;
    return this.value === otherPhone.value;
  }
}
