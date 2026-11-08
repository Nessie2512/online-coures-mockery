import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { Request, Response } from 'express';
import {
  ProblemDetails,
  parseFieldErrors,
  problemCode,
  problemTitle,
  stableCode,
} from './problem-details';
import { DomainError } from './domainError';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = this.exceptionStatus(exception);

    if (status >= Number(HttpStatus.INTERNAL_SERVER_ERROR)) {
      const error =
        exception instanceof Error ? exception : new Error(String(exception));
      this.logger.error(
        `${request.method} ${request.path} failed: ${error.message}`,
        error.stack,
      );
    }

    const requestId =
      this.headerValue(request.headers['x-request-id']) ?? randomUUID();
    const body = this.exceptionBody(exception);

    let detail = 'Internal server error';
    let code = problemCode(status);
    let errors: ProblemDetails['errors'];

    if (exception instanceof HttpException) {
      if (typeof body === 'string') {
        detail = body;
      } else if (body && typeof body === 'object') {
        const payload = body as Record<string, unknown>;
        const rawMessage = payload.message ?? payload.detail ?? payload.error;
        if (Array.isArray(rawMessage)) {
          detail = 'A validação dos dados enviados falhou.';
          errors = parseFieldErrors(rawMessage);
        } else if (typeof rawMessage === 'string') {
          detail = rawMessage;
        }
        if (typeof payload.code === 'string') code = payload.code;
      }
      if (!errors && Array.isArray((body as Record<string, unknown>)?.errors)) {
        errors = parseFieldErrors((body as Record<string, unknown>).errors);
      }
      if (detail !== 'Internal server error') {
        code = stableCode(detail, code);
      }
    } else if (exception instanceof DomainError) {
      detail = exception.message;
      code = exception.code;
    }

    const problem: ProblemDetails = {
      type: `https://httpstatuses.com/${status}`,
      title: problemTitle(status),
      status,
      detail,
      instance: request.originalUrl ?? request.url ?? request.path,
      code,
      requestId,
      timestamp: new Date().toISOString(),
      ...(errors && errors.length > 0 ? { errors } : {}),
    };

    if (typeof response.setHeader === 'function') {
      response.setHeader('Content-Type', 'application/problem+json');
      response.setHeader('X-Request-Id', requestId);
    }

    response.status(status).json(problem);
  }

  private exceptionBody(exception: unknown): unknown {
    if (exception instanceof HttpException) {
      return exception.getResponse();
    }
    return 'Internal server error';
  }

  private exceptionStatus(exception: unknown): number {
    if (exception instanceof HttpException) return exception.getStatus();
    if (!(exception instanceof DomainError)) {
      return HttpStatus.INTERNAL_SERVER_ERROR;
    }

    switch (exception.code) {
      case 'VALIDATION':
      case 'DOMAIN_INVARIANT_VIOLATION':
        return HttpStatus.BAD_REQUEST;
      case 'NOT_FOUND':
        return HttpStatus.NOT_FOUND;
      case 'CONFLICT':
        return HttpStatus.CONFLICT;
      case 'FORBIDDEN':
        return HttpStatus.FORBIDDEN;
    }
  }

  private headerValue(
    value: string | string[] | undefined,
  ): string | undefined {
    if (Array.isArray(value)) return value[0];
    return value;
  }
}
