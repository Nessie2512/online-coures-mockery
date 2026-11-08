import { Student } from "../entities/student.entity";


export abstract class StudentRepository {
    
    abstract save(student:Student): Promise<any>;
    abstract findById(studentId: string): Promise<any>;
    abstract update(studentId: string, studentData: any): Promise<void>;
    abstract delete(studentId: string): Promise<void>;
    abstract findAll(): Promise<any[]>;
}