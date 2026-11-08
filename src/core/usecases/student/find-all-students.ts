import { StudentRepository } from "../../repository/student-repository";

export class FindAllStudents {
    constructor(
        private readonly studentRepository: StudentRepository,
    ) {}

    async execute(): Promise<any[]> {
        return await this.studentRepository.findAll();
    }
}