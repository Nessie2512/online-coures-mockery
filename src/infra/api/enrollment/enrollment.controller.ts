import { Controller } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';

@Controller()
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}
}
