import {
  ArgumentsHost,
  ConflictException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { describe, expect, it, vi } from 'vitest';
import { GlobalExceptionFilter } from './http-exception.filter';

describe('GlobalExceptionFilter', () => {
  it('preserves a domain error code in the Problem Details code field', () => {
    const filter = new GlobalExceptionFilter();
    const responseJson = vi.fn();
    const responseStatus = vi.fn().mockReturnValue({ json: responseJson });
    const host = {
      switchToHttp: () => ({
        getResponse: () => ({ status: responseStatus, setHeader: vi.fn() }),
        getRequest: () => ({
          method: 'POST',
          path: '/enrollments',
          url: '/enrollments',
          originalUrl: '/enrollments',
          headers: {},
        }),
      }),
    } as unknown as ArgumentsHost;

    filter.catch(
      new ConflictException(
        'CLASS_CAPACITY_EXCEEDED: the selected class is full.',
      ),
      host,
    );

    expect(responseJson).toHaveBeenCalledWith(
      expect.objectContaining({
        status: HttpStatus.CONFLICT,
        code: 'CLASS_CAPACITY_EXCEEDED',
      }),
    );
  });

  it('returns RFC 9457 problem details and a request id for unexpected errors', () => {
    const filter = new GlobalExceptionFilter();
    const exception = new Error('Database connection failed');
    const responseJson = vi.fn();
    const responseStatus = vi.fn().mockReturnValue({ json: responseJson });
    const setHeader = vi.fn();
    const host = {
      switchToHttp: () => ({
        getResponse: () => ({ status: responseStatus, setHeader }),
        getRequest: () => ({
          method: 'POST',
          path: '/auth/login',
          url: '/auth/login',
          originalUrl: '/auth/login',
          headers: {},
        }),
      }),
    } as unknown as ArgumentsHost;
    const logError = vi.spyOn(Logger.prototype, 'error').mockImplementation();

    filter.catch(exception, host);

    expect(logError).toHaveBeenCalledWith(
      'POST /auth/login failed: Database connection failed',
      exception.stack,
    );
    expect(setHeader).toHaveBeenCalledWith(
      'Content-Type',
      'application/problem+json',
    );
    expect(responseStatus).toHaveBeenCalledWith(
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
    expect(responseJson).toHaveBeenCalledWith(
      expect.objectContaining({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        title: 'Internal Server Error',
        code: 'INTERNAL_ERROR',
        detail: 'Internal server error',
        instance: '/auth/login',
        requestId: expect.any(String),
      }),
    );
    expect(responseJson.mock.calls[0][0]).not.toHaveProperty(
      'message',
      exception.message,
    );
  });
});
