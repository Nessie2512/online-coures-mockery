import { Injectable } from "@nestjs/common";
import { courseRepository } from "../../repository/course-repository";


@Injectable()
export class findAllCourses {
    constructor(
        private readonly courseRepository: courseRepository,
    ) {}

    async execute(): Promise<any> {
        return await this.courseRepository.findAll();
    }
}