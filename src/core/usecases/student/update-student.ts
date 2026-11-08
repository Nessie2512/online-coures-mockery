import { StudentRepository } from "../../repository/student-repository";


export class updateStudent{

    constructor(
        private readonly studentRepository: StudentRepository,
    ) {}

    async execute(studentData: any, courseId: string): Promise<void> {
         await this.studentRepository.update(studentData, courseId);
}
}