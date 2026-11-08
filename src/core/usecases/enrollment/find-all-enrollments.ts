import { EnrollmentRepository } from "../../repository/enrollment-repository";


export class findAllEnrollments {

    constructor(
        private readonly enrollmentRepository: EnrollmentRepository,
    ) {}

    async execute(): Promise<any> {
         return await this.enrollmentRepository.findAll();
    }
}