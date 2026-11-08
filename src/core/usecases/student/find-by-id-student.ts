import { StudentRepository } from "../../repository/student-repository";


export class findByIdStudent {

    constructor(
        private readonly studentRepository: StudentRepository,
    ) {}

    async execute(studentId: string): Promise<any> {
        const student = await this.studentRepository.findById(studentId);
        return student;
    }
}