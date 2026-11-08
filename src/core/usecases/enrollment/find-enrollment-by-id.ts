import { Injectable } from "@nestjs/common";
import { EnrollmentRepository } from "../../repository/enrollment-repository";

@Injectable()
export class findEnrollmentById {

    constructor(
        private readonly enrollmentRepository: EnrollmentRepository,
    ) {}

    async execute(enrollmentId: string): Promise<any> {
        const enrollment = await this.enrollmentRepository.findById(enrollmentId);
        return enrollment;
    }
}