import { Injectable } from "@nestjs/common";
import { EnrollmentRepository } from "../../repository/enrollment-repository";
import { Enrollment } from "../../entities/enrollment.entity";


@Injectable()
export class createEnrollment {

    constructor(
        private readonly enrollmentRepository: EnrollmentRepository,
    ) {}

    async execute(studentId: string, courseId:string): Promise<void> {

        const newEnrollment = Enrollment.create({ studentId, courseId });
         await this.enrollmentRepository.save(newEnrollment);
}

}