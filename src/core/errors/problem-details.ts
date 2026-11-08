export type ProblemFieldError = {
  field: string;
  message: string;
};

export type ProblemDetails = {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
  code: string;
  requestId: string;
  timestamp: string;
  errors?: ProblemFieldError[];
};

const STATUS_TITLES: Record<number, string> = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  409: 'Conflict',
  412: 'Precondition Failed',
  422: 'Unprocessable Entity',
  429: 'Too Many Requests',
  500: 'Internal Server Error',
  503: 'Service Unavailable',
};

const STATUS_CODES: Record<number, string> = {
  400: 'VALIDATION_ERROR',
  401: 'UNAUTHENTICATED',
  403: 'FORBIDDEN',
  404: 'NOT_FOUND',
  409: 'CONFLICT',
  412: 'PRECONDITION_FAILED',
  422: 'UNPROCESSABLE_ENTITY',
  429: 'TOO_MANY_REQUESTS',
  500: 'INTERNAL_ERROR',
  503: 'SERVICE_UNAVAILABLE',
};

export function problemTitle(status: number): string {
  return STATUS_TITLES[status] ?? 'Error';
}

export function problemCode(status: number): string {
  return STATUS_CODES[status] ?? `HTTP_${status}`;
}

/**
 * Extracts a stable machine-readable code from a domain/HTTP message.
 * Domain use cases already throw codes such as DUPLICATE_ENROLLMENT or
 * CLASS_FULL; those are preserved instead of being replaced by a generic code.
 */
export function stableCode(message: string, fallback: string): string {
  const genericCodes = new Set([
    'BAD_REQUEST',
    'CONFLICT',
    'FORBIDDEN',
    'INTERNAL_ERROR',
    'NOT_FOUND',
    'PRECONDITION_FAILED',
    'UNAUTHENTICATED',
    'UNPROCESSABLE_ENTITY',
    'VALIDATION_ERROR',
  ]);
  const tokens = message.match(/\b[A-Z][A-Z0-9_]{2,}\b/g) ?? [];
  return tokens.find((token) => !genericCodes.has(token)) ?? fallback;
}

export function parseFieldErrors(message: unknown): ProblemFieldError[] {
  const values = Array.isArray(message) ? message : [message];
  const errors: ProblemFieldError[] = [];

  for (const value of values) {
    if (typeof value !== 'string') continue;
    const match = value.match(/^([A-Za-z0-9_.]+)\s+(.+)$/);
    errors.push({
      field: match?.[1] ?? 'body',
      message: value,
    });
  }

  return errors;
}
