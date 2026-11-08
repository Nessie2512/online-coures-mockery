import { StudentRepository } from "../../repository/student-repository";


export class createStudent{

    constructor(
        private readonly studentRepository: StudentRepository,
    ) {}

    async execute(studentData: any, courseId: string): Promise<void> {
         await this.studentRepository.save(studentData);
}
}