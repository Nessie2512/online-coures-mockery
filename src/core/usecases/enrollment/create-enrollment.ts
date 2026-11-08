import { Injectable } from "@nestjs/common";
import { EnrollmentRepository } from "../../repository/enrollment-repository";


@Injectable()
export class createEnrollment {

    constructor(
        private readonly enrollmentRepository: EnrollmentRepository,
    ) {}

    async execute(studentId: string, courseId:string): Promise<void> {
         await this.enrollmentRepository.save(studentId, courseId);
}

}