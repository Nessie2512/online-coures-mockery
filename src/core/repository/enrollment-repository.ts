import { Enrollment } from "../entities/enrollment.entity";


export abstract class EnrollmentRepository {
    abstract save(enrollment:Enrollment): Promise<any>;
    abstract findById(enrollmentId: string): Promise<any>;
    abstract update(enrollmentId: string, enrollmentData: any): Promise<void>;
    abstract delete(enrollmentId: string): Promise<void>;
    abstract findAll(): Promise<any[]>;
}