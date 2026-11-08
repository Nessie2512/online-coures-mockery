import { Injectable } from "@nestjs/common";
import { EnrollmentRepository } from "../../repository/enrollment-repository";

@Injectable()
export class findAllEnrollments {

    constructor(
        private readonly enrollmentRepository: EnrollmentRepository,
    ) {}

    async execute(): Promise<any> {
         return await this.enrollmentRepository.findAll();
    }
}