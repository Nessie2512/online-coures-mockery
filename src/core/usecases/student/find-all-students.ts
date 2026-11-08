import { Injectable } from "@nestjs/common";
import { StudentRepository } from "../../repository/student-repository";

@Injectable()
export class FindAllStudents {
    constructor(
        private readonly studentRepository: StudentRepository,
    ) {}

    async execute(): Promise<any[]> {
        return await this.studentRepository.findAll();
    }
}