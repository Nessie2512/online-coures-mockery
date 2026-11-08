// domain/errors/domain.error.ts
export type DomainErrorCode =
  | 'VALIDATION'
  | 'NOT_FOUND'
  | 'CONFLICT'
  | 'FORBIDDEN'
  | 'DOMAIN_INVARIANT_VIOLATION';

export class DomainError extends Error {
  constructor(
    public readonly code: DomainErrorCode,
    message: string,
    public readonly details?: Record<string, unknown>,
  ) {
    super(message);
    this.name = new.target.name;
  }
}

export class ValidationError extends DomainError {
  constructor(message: string, details?: Record<string, unknown>) {
    super('VALIDATION', message, details);
  }
}

export class NotFoundError extends DomainError {
  constructor(entity: string, id: string) {
    super('NOT_FOUND', `${entity} not found`, { entity, id });
  }
}

export class ConflictError extends DomainError {
  constructor(message: string, details?: Record<string, unknown>) {
    super('CONFLICT', message, details);
  }
}

export class ForbiddenError extends DomainError {
  constructor(message = 'Operation not allowed') {
    super('FORBIDDEN', message);
  }
}

export class InvariantViolationError extends DomainError {
  constructor(message: string) {
    super('DOMAIN_INVARIANT_VIOLATION', message);
  }
}

// domain/order/order.entity.ts
// export class Order {
//   cancel(now: Date) {
//     if (this.status === 'SHIPPED') {
//       throw new InvariantViolationError('Cannot cancel a shipped order');
//     }
//     this.status = 'CANCELLED';
//     this.cancelledAt = now;
//   }
// }

//Use cases não apanham isto para transformar em HTTP. Deixam subir. Só apanham se tiverem de compensar (rollback, outra ação).

// application/cancel-order.use-case.ts
// export class CancelOrderUseCase {
//   constructor(private readonly orders: OrderRepository) {}
//   async execute(id: string) {
//     const order = await this.orders.findById(id);
//     if (!order) throw new NotFoundError('Order', id);
//     order.cancel(new Date());
//     await this.orders.save(order);
//   }
// }
