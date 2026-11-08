import { valueObject } from './ValueObject';
import { InvariantViolationError } from '../errors/domainError';

export class Name extends valueObject<string> {
  constructor(value: string) {
    // 1. Validação de Negócio (Impede que o objeto seja criado em estado inválido)
    const normalized = value?.trim().replace(/\s+/g, ' ');
    if (!normalized || normalized.length < 5) {
      throw new InvariantViolationError(
        'O nome deve conter pelo menos 5 caracteres.',
      );
    }

    if (normalized.length > 40) {
      throw new InvariantViolationError(
        'O nome não pode exceder os 40 caracteres.',
      );
    }

    // Opcional: Validar se contém apenas letras/espaços (Impede caracteres estranhos)
    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
    if (!nameRegex.test(value)) {
      throw new InvariantViolationError('O nome contém caracteres inválidos.');
    }

    // 2. Normalização (Garante consistência de dados removendo espaços duplos)
    super(normalized);
  }

  // Value Objects são comparados pelos seus valores, não pela sua referência em memória
  public equals(othername: valueObject<string>): boolean {
    if (othername === null || othername === undefined) {
      return false;
    }
    return this.value.toLowerCase() === othername.value.toLowerCase();
  }
}
