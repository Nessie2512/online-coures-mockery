import { Injectable } from "@nestjs/common";
import { StudentRepository } from "../../repository/student-repository";

@Injectable()
export class DeleteStudent {

    constructor(
        private readonly studentRepository: StudentRepository,
    ) {}

    async execute(studentId: string): Promise<void> {
         await this.studentRepository.delete(studentId);
    }
}