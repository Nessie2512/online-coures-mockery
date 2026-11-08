import { Injectable } from '@nestjs/common';
import { createStudent } from '../../../core/usecases/student/create-student';
import { findByIdStudent } from '../../../core/usecases/course/find-course-by-id';
import { FindAllStudents } from '../../../core/usecases/student/find-all-students';
import { updateStudent } from '../../../core/usecases/student/update-student';
import { DeleteStudent } from '../../../core/usecases/student/delete-student';

@Injectable()
export class studentService {

  constructor(
    private readonly createStudent: createStudent,
    private readonly findstudentById: findByIdStudent,
    private readonly findAllStudents: FindAllStudents,
    private readonly updateStudent: updateStudent,
    private readonly deleteStudent: DeleteStudent
  ) {}


  async create(studentData:studentDTO): Promise<void> {

    try {
        await this.createStudent.execute(studentData);
    } 
    catch (error:any) {
      throw new Error('Error creating student: ' + error.message);
    }
  }

  async findById(id: string): Promise<any> {

    try {
      return await this.findstudentById.execute(id);
    } 
    catch (error:any) {
      throw new Error('Error finding student by ID: ' + error.message);
    }
  }

  async findAll(): Promise<any> {
    
    try{
      return await this.findAllStudents.execute();
    }
    catch (error:any) {
      throw new Error('Error finding all students: ' + error.message);
    }
  }

  async update(id: string, studentData: studentDTO): Promise<void> {
    try {
      await this.updateStudent.execute(id, studentData);
    } 
    catch (error:any) {
      throw new Error('Error updating student: ' + error.message);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.deleteStudent.execute(id);
    } 
    catch (error:any) {
      throw new Error('Error deleting student: ' + error.message);
    }
  }
}
