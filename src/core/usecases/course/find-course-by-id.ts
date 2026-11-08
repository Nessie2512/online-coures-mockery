import { Injectable } from "@nestjs/common";
import { StudentRepository } from "../../repository/student-repository";


@Injectable()
export class findByIdCourse {

    constructor(
        private readonly studentRepository: StudentRepository,
    ) {}

    async execute(studentId: string): Promise<any> {
        const student = await this.studentRepository.findById(studentId);
        return student;
    }
    
}