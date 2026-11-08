import { valueObject } from './ValueObject';

export interface AngolanAddressProps {
  streetAndNumber: string; // e.g., "Rua Comandante Nzaji, 45" or "Caixa Postal 123"
  neighborhood: string; // Bairro (Essential for navigation in Angola)
  municipality: string; // Município (e.g., Belas, Viana, Cazenga, Ingombota)
  province: string; // Província (One of the official regions)
}

export class Address extends valueObject<AngolanAddressProps> {
  private static readonly VALID_PROVINCES = [
    'BENGO',
    'BENGUELA',
    'BIÉ',
    'CABINDA',
    'CUANDO',
    'CUANZA NORTE',
    'CUANZA SUL',
    'CUBANGO',
    'CUNENE',
    'HUAMBO',
    'HUÍLA',
    'ICOLO E BENGO',
    'LUANDA',
    'LUNDA NORTE',
    'LUNDA SUL',
    'MALANJE',
    'MOXICO',
    'MOXICO LESTE',
    'NAMIBE',
    'UÍGE',
    'ZAIRE',
  ];

  constructor(props: AngolanAddressProps) {
    if (!props) {
      throw new Error('Address properties are required.');
    }

    // 1. Mandatory Business Validations for Angolan Context
    if (!props.streetAndNumber || props.streetAndNumber.trim() === '') {
      throw new Error('Street name/number or Caixa Postal is required.');
    }
    if (!props.neighborhood || props.neighborhood.trim() === '') {
      throw new Error('Neighborhood (Bairro) is required.');
    }
    if (!props.municipality || props.municipality.trim() === '') {
      throw new Error('Municipality (Município) is required.');
    }
    if (!props.province || props.province.trim() === '') {
      throw new Error('Province is required.');
    }

    // 2. Normalize inputs to uppercase for standard compliance
    const normalizedProvince = props.province.trim().toUpperCase();

    // 3. Strict domain check to ensure the province exists in Angola
    if (!Address.VALID_PROVINCES.includes(normalizedProvince)) {
      throw new Error(`Invalid Angolan province: "${props.province}".`);
    }

    const normalizedProps: AngolanAddressProps = {
      streetAndNumber: props.streetAndNumber.trim(),
      neighborhood: props.neighborhood.trim(),
      municipality: props.municipality.trim(),
      province: normalizedProvince,
    };

    super(normalizedProps);
  }

  // Value Objects must override equality to evaluate data values rather than memory references
  public equals(otherAddress: valueObject<AngolanAddressProps>): boolean {
    if (!otherAddress) return false;

    return (
      this.value.streetAndNumber.toLowerCase() ===
        otherAddress.value.streetAndNumber.toLowerCase() &&
      this.value.neighborhood.toLowerCase() ===
        otherAddress.value.neighborhood.toLowerCase() &&
      this.value.municipality.toLowerCase() ===
        otherAddress.value.municipality.toLowerCase() &&
      this.value.province === otherAddress.value.province
    );
  }

  /**
   * Helper method to output the address line as a standard localized mailing format
   * Layout: Street, Bairro, Município, PROVÍNCIA, ANGOLA
   */
  public toMailingFormat(): string {
    return `${this.value.streetAndNumber},${this.value.neighborhood}, ${this.value.municipality}, ${this.value.province}, ANGOLA`;
  }

  static fromString(addressString: string): Address {
    if (!addressString || addressString.trim() === '') {
      throw new Error('Address string cannot be empty.');
    }

    const parts = addressString.split(',').map((part) => part.trim());
    if (parts[parts.length - 1]?.toUpperCase() === 'ANGOLA') {
      parts.pop();
    }

    const province = parts[parts.length - 1] || 'LUANDA';
    const normalizedProvince = province.toUpperCase();
    if (!Address.VALID_PROVINCES.includes(normalizedProvince)) {
      throw new Error(`Invalid Angolan province: "${province}".`);
    }

    if (parts.length === 3) {
      return new Address({
        neighborhood: parts[0],
        municipality: parts[0],
        streetAndNumber: parts[1],
        province,
      });
    }

    return new Address({
      streetAndNumber: parts.slice(0, -3).join(', ') || 'N/A',
      neighborhood: parts[parts.length - 3] || 'N/A',
      municipality: parts[parts.length - 2] || 'N/A',
      province,
    });
  }
}
