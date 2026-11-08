import { Module } from '@nestjs/common';
import { studentService } from './student.service';
import { studentController } from './student.controller';
import { createStudent } from '../../../core/usecases/student/create-student';
import { DeleteStudent } from '../../../core/usecases/student/delete-student';
import { updateStudent } from '../../../core/usecases/student/update-student';
import { FindAllStudents } from '../../../core/usecases/student/find-all-students';
import { findByIdStudent } from '../../../core/usecases/course/find-course-by-id';
import { StudentRepository } from '../../../core/repository/student-repository';
import { studentPrisma } from '../../database/student.prisma';


@Module({
  imports: [],
  controllers: [studentController ],
  providers:
   [
    studentService,
    createStudent,
    DeleteStudent,
    updateStudent,
    findByIdStudent,
    FindAllStudents,
    {
      provide: StudentRepository,
      useClass: studentPrisma, // Replace with your actual implementation
    }
  ]
})
export class studentModule {}
