import { EnrollmentRepository } from "../../repository/enrollment-repository";

export class createEnrollment {

    constructor(
        private readonly enrollmentRepository: EnrollmentRepository,
    ) {}

    async execute(studentId: string, courseId:string): Promise<void> {
         await this.enrollmentRepository.save(studentId, courseId);
}

}