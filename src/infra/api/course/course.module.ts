import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { findAllCourses } from '../../../core/usecases/course/find-all-courses';
import { deleteCourse } from '../../../core/usecases/course/delete-course';
import { createCoures } from '../../../core/usecases/course/create-course';
import { findByIdCourse } from '../../../core/usecases/course/find-course-by-id';
import { courseRepository } from '../../../core/repository/course-repository';
import { prismaCourseRepository } from '../../database/course.prisma';


@Module({
  imports: [],
  controllers: [CourseController],
  providers: 
  [
  CourseService,
  createCoures,
  deleteCourse,
  findAllCourses,
  findByIdCourse,
  {
    provide: courseRepository,
    useClass: prismaCourseRepository
  }
  ]
  ,
})
export class CourseModule {}
