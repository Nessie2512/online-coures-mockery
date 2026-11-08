

export abstract class StudentRepository {
    
    abstract save(studentData: any): Promise<any>;
    abstract findById(studentId: string): Promise<any>;
    abstract update(studentId: string, studentData: any): Promise<void>;
    abstract delete(studentId: string): Promise<void>;
    abstract findAll(): Promise<any[]>;
}