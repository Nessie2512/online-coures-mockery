import { Injectable } from "@nestjs/common";
import { StudentRepository } from "../../repository/student-repository";
import { Student, StudentProps } from "../../entities/student.entity";

@Injectable()
export class createStudent{

    constructor(
        private readonly studentRepository: StudentRepository,
    ) {}

    async execute(studentData: StudentProps): Promise<void> {
        const newStudent = Student.create(studentData);
        await this.studentRepository.save(newStudent);
}
}