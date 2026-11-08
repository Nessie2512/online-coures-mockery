import { Injectable } from "@nestjs/common";
import { StudentRepository } from "../../repository/student-repository";

@Injectable()
export class updateStudent{

    constructor(
        private readonly studentRepository: StudentRepository,
    ) {}

    async execute(studentData: any, courseId: string): Promise<void> {
         await this.studentRepository.update(studentData, courseId);
}
}