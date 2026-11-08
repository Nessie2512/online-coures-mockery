import { Module } from '@nestjs/common';
import { EnrollmentController } from './enrollment.controller';
import { EnrollmentService } from './enrollment.service';
import { createEnrollment } from '../../../core/usecases/enrollment/create-enrollment';
import { DeleteEnrollment } from '../../../core/usecases/enrollment/delete-enrollment';
import { findAllEnrollments } from '../../../core/usecases/enrollment/find-all-enrollments';
import { findEnrollmentById } from '../../../core/usecases/enrollment/find-enrollment-by-id';
import { EnrollmentRepository } from '../../../core/repository/enrollment-repository';
import { prismaEnrollmentRepository } from '../../database/enrollment.prisma';



@Module({
  imports: [],
  controllers: [EnrollmentController],
  providers: 
  [
    EnrollmentService,
    createEnrollment,
    DeleteEnrollment,
    findEnrollmentById,
    findAllEnrollments,
   { 
    provide: EnrollmentRepository,
    useClass: prismaEnrollmentRepository
    } // Replace with your actual implementation
  ]
})
export class EnrollmentModule {}
