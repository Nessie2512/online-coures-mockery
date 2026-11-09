import { Module } from '@nestjs/common';
import { studentModule } from './infra/api/student/student.module';
import { CourseModule } from './infra/api/course/course.module';



@Module({
  imports: 
  [
    studentModule,
    CourseModule,
    EnrollmentModule
  ], 
})
export class EnrollmentModule {}
