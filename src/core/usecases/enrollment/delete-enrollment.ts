import { EnrollmentRepository } from "../../repository/enrollment-repository";

export class DeleteEnrollment {
    constructor(
        private readonly enrollmentRepository: EnrollmentRepository,
    ) {}

    async execute(enrollmentId: string): Promise<void> {
        await this.enrollmentRepository.delete(enrollmentId);
    }   
}