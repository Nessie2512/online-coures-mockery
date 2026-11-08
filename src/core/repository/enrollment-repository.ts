

export abstract class EnrollmentRepository {
    abstract save(enrollmentData: any): Promise<any>;
    abstract findById(enrollmentId: string): Promise<any>;
    abstract update(enrollmentId: string, enrollmentData: any): Promise<void>;
    abstract delete(enrollmentId: string): Promise<void>;
}